import React from "react";
import ShortText from "../ShortText/index.jsx";
import Column from "../Column.jsx";
import { Heading2 } from "../Headings/index.jsx";
import useStyles from "./style.js";

export default function IncidentCard({incident}) {
    const styles = useStyles();
    const cardShadowClassifier = "status-" + incident.status;
    return (
        <Column className={styles.IncidentCard + " " + cardShadowClassifier}>
            <Heading2>{incident.name}</Heading2>
            {incident.duration && <ShortText>{incident.duration + " мин"}</ShortText> }
            <ShortText>{"Статус: " + incident.statusName}</ShortText>
            <ShortText>{"Дата: " + incident.dateTime.toLocaleDateString() + " " + incident.dateTime.toLocaleTimeString()}</ShortText>
        </Column>
    );
}
