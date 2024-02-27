import React, { useEffect, useState } from "react";
import ShortText from "../ShortText/index.jsx";
import Column from "../Column.jsx";
import { Heading2 } from "../Headings/index.jsx";
import useStyles from "./style.js";
import { useDispatch, useSelector } from "react-redux";
import { commentsFetched, commentsRequested, getAvailableComments, getRequestStatus } from "../../services/commentsSlice.js";
import { ApiRequestStatus } from "../../services/slicesBase.js";
import { addNewComment, retrieveComments } from "../../services/api.js";
import SendIcon from "../../svg/SendIcon.jsx";

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

    const doAddNewComment = (text) => {
        const username = (window.Telegram == null) ? "fake" : window.Telegram.WebApp.initDataUnsafe.user.username;
        addNewComment(username, text, incident.incidentId, "REPORTED").then(
            success => {
                if (success)
                    requestComments();
            }
        );
    };

    let comments = [];
    if (isExpanded) {
        comments = getAvailableComments(commentsSlice, incident.serviceId, incident.incidentId);
    }
    const cardShadowClassifier = "status-" + incident.status;
    return (
        <div className={styles.IncidentCard + " " + cardShadowClassifier} onClick={() => setIsExpanded(!isExpanded) }>
            <Heading2>{incident.name}</Heading2>
            {incident.duration && <ShortText>{incident.duration + " мин"}</ShortText> }
            <ShortText>{"Статус: " + incident.statusName}</ShortText>
            <ShortText>{"Дата: " + incident.dateTime.toLocaleDateString() + " " + incident.dateTime.toLocaleTimeString()}</ShortText>
            {comments.map(item => <div key={item.id}><Comment comment={item}/></div>)}
            {isExpanded && <CommentInput incidentId={incident.incidentId} doAddNewComment={doAddNewComment}/>}
        </div>
    );
}

function Comment({comment}) {
    return (
        <Column>
            <ShortText>{comment.contents}</ShortText>
        </Column>
    )
}

function CommentInput({incidentId, doAddNewComment}) {
    const inputId = "input-comment-" + incidentId;
    const onSendClicked = () => {
        const el = document.getElementById(inputId)
        const text = el.value;
        el.value = "";
        doAddNewComment(text);
    };
    return (
        <div className="comment-input" onClick={e => e.stopPropagation()}>
            <input id={inputId} type="text" placeholder="Напишите комментарий"/>
            <button onClick={onSendClicked}><SendIcon/></button>
        </div>
    );
}
