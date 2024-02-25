import React, {useState} from "react";

import { Heading2 } from "../Headings";
import { retrieveIncidents } from "../../services/api";
import StatusText from "../StatusText.jsx";
import ShortText from "../ShortText";
import Column from "../Column.jsx";
import useStyles from "./style";

export default function IncidentsHistory({serviceName, className}) {
    const [incidents, setIncidents] = useState(null);
    if (incidents === null) {
        retrieveIncidents(serviceName).then((incidents) => {
            setIncidents(incidents);
        })
    }
    const styles = useStyles();
    return (
        <div className={className + ' ' + styles.incidentsHistory}>
            <Heading2>История инцидентов</Heading2>
            {(incidents
                ? <>{incidents.map(item => <Incident key={item.date} incident={item}/>)}</>
                : <p>Loading...</p>
            )}
        </div>
    );
}

function Incident({incident}) {
    return (
        <Column className="m-top-2">
            <Heading2>{incident.name}</Heading2>
            {incident.duration && <ShortText>{incident.duration + " мин"}</ShortText> }
            <StatusText status={incident.status}/>
            <ShortText>{"Дата: " + incident.date.toLocaleDateString()}</ShortText>
        </Column>
    );
}
