import React, { useEffect, useState } from "react";
import ShortText from "../ShortText/index.jsx";
import Column from "../Column.jsx";
import { Heading2 } from "../Headings/index.jsx";
import useStyles from "./style.js";
import { useDispatch, useSelector } from "react-redux";
import { commentsFetched, commentsRequested, getAvailableComments, getRequestStatus } from "../../services/commentsSlice.js";
import { ApiRequestStatus } from "../../services/slicesBase.js";
import { retrieveComments } from "../../services/api.js";

export default function IncidentCard({incident}) {
    const styles = useStyles();
    const commentsSlice = useSelector(state => state.comments);
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (getRequestStatus(commentsSlice, incident.serviceId, incident.incidentId) == ApiRequestStatus.Initial) {
            dispatch(commentsRequested({serviceId: incident.serviceId, incidentId: incident.incidentId}));
            retrieveComments(incident.serviceId, incident.incidentId).then(
                result => dispatch(commentsFetched(result))
            );
        }
    });

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
        </div>
    );
}

function Comment({comment}) {
    console.log(`comment#${comment.id}  ${JSON.stringify(comment)}`);
    return (
        <Column>
            {/* <ShortText>{comment.StatusName}</ShortText> */}
            <ShortText>{comment.contents}</ShortText>
        </Column>
    )
}
