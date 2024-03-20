import React, { useEffect, useState } from "react";
import ShortText from "../ShortText/index.jsx";
import { Heading2 } from "../Headings/index.jsx";
import useStyles from "./style.js";
import { useDispatch, useSelector } from "react-redux";
import { adminCheckResult, commentsFetched, commentsRequested, getAvailableComments, getRequestStatus, isAdminCheckStarted } from "../../services/commentsSlice.js";
import { ApiRequestStatus } from "../../services/slicesBase.js";
import { addNewComment, checkIsAdmin, retrieveComments } from "../../services/api.js";
import SendIcon from "../../svg/SendIcon.jsx";
import { getCurrentUsername } from "../../services/TelegramContext.js";
import { IncidentStatusNames } from "../../services/Incident.js";
import { incidentStatusUpdated } from "../../services/incidentsSlice.js";

export default function IncidentCard({incident}) {
    const styles = useStyles();
    const commentsSlice = useSelector(state => state.comments);
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);


    const requestComments = () => {
        dispatch(commentsRequested({serviceId: incident.serviceId, incidentId: incident.incidentId}));
        retrieveComments(incident.serviceId, incident.incidentId).then(
            result => dispatch(commentsFetched(result))
        );
    };

    useEffect(() => {
        if (getRequestStatus(commentsSlice, incident.serviceId, incident.incidentId) == ApiRequestStatus.Initial) {
            requestComments();
        }
    });

    if (needCheckAdminAgain(commentsSlice)) {
        dispatch(isAdminCheckStarted());
        checkIsAdmin(getCurrentUsername()).then(
            result => dispatch(adminCheckResult(result))
        );
    }

    const doAddNewComment = (text, newIncidentStatus) => {
        const username = getCurrentUsername();
        addNewComment(username, text, incident.incidentId, newIncidentStatus).then(
            success => {
                if (success) {
                    requestComments();
                    dispatch(incidentStatusUpdated({
                        serviceName: incident.serviceId,
                        newStatus: newIncidentStatus,
                        incidentId: incident.incidentId,
                    }))
                }
            }
        );
    };
    const canAddComments = commentsSlice.admin.result != null && !!commentsSlice.admin.result;
    let comments = [];
    if (isExpanded) {
        comments = getAvailableComments(commentsSlice, incident.serviceId, incident.incidentId);
    }
    const cardShadowClassifier = "status-" + incident.status;
    return (
        <div className={styles.IncidentCard + " text-size-m " + cardShadowClassifier} onClick={() => setIsExpanded(!isExpanded) }>
            <Heading2>{incident.name}</Heading2>
            {incident.duration && <ShortText>{incident.duration + " мин"}</ShortText> }
            <ShortText>{"Статус: " + incident.statusName}</ShortText>
            <ShortText>{"Дата: " + incident.dateTime.toLocaleDateString() + " " + incident.dateTime.toLocaleTimeString()}</ShortText>
            {comments.map(item => <Comment key={item.id} comment={item} styles={styles}/>)}
            {isExpanded && canAddComments && <SelectNewStatus incidentId={incident.incidentId} />}
            {isExpanded && canAddComments && <CommentInput incidentId={incident.incidentId} doAddNewComment={doAddNewComment}/>}
        </div>
    );
}

function Comment({comment, styles, ...props}) {
    const statusName = IncidentStatusNames[comment.newIncidentStatus];
    const commentDate = new Date(comment.creationDate);
    return (
        <div className={styles.Comment} {...props}>
            <div className="comment-header">
                <ShortText className="date-string">{commentDate.toLocaleDateString() + " " + commentDate.toLocaleTimeString()}</ShortText>
                <ShortText className={`color-${comment.newIncidentStatus}`}>{statusName}</ShortText>
            </div>
            <ShortText>{comment.contents}</ShortText>
        </div>
    )
}

function CommentInput({incidentId, doAddNewComment}) {
    const inputId = "input-comment-" + incidentId;
    const onSendClicked = () => {
        const input = document.getElementById(inputId)
        const text = input.value;
        input.value = "";
        const select = document.getElementById(getSelectId(incidentId));
        const newIncidentStatus = select.value;
        doAddNewComment(text, newIncidentStatus);
    };
    return (
        <div className="comment-input" onClick={e => e.stopPropagation()}>
            <input id={inputId} type="text" placeholder="Напишите комментарий"/>
            <button onClick={onSendClicked}><SendIcon/></button>
        </div>
    );
}

function SelectNewStatus({incidentId}) {
    return (
        <select className="select-new-status" id={getSelectId(incidentId)} onClick={e => e.stopPropagation()}>
            {Object.keys(IncidentStatusNames).map(key => <option key={key} value={key}>{IncidentStatusNames[key]}</option>)}
        </select>
    )
}

function getSelectId(incidentId) {
    return `select-new-status-${incidentId}`;
}

function needCheckAdminAgain(commentsSlice) {
    if (commentsSlice.admin.checking)
        return false;
    if (commentsSlice.admin.result != null)
        return false;
    if (commentsSlice.admin.error == null)
        return true;
    if (commentsSlice.admin.error.time + 5000 < new Date().valueOf())
        return true;
    return false;
}
