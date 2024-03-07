import React, { useEffect, useState } from "react";
import ShortText from "../ShortText/index.jsx";
import { Heading2 } from "../Headings/index.jsx";
import useStyles from "./style.js";
import { useDispatch, useSelector } from "react-redux";
import { commentsFetched, commentsRequested, getAvailableComments, getRequestStatus } from "../../services/commentsSlice.js";
import { ApiRequestStatus } from "../../services/slicesBase.js";
import { addNewComment, retrieveComments } from "../../services/api.js";
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
            {comments.map(item => <div className="comment-row" key={item.id}><Comment comment={item}/></div>)}
            {isExpanded && <SelectNewStatus incidentId={incident.incidentId} />}
            {isExpanded && <CommentInput incidentId={incident.incidentId} doAddNewComment={doAddNewComment}/>}
        </div>
    );
}

function Comment({comment}) {
    const statusName = IncidentStatusNames[comment.newIncidentStatus];
    return (
        <>
            <ShortText>{comment.contents}</ShortText>
            <ShortText className={`color-${comment.newIncidentStatus}`}>{statusName}</ShortText>
        </>
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
