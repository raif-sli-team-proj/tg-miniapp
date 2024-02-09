import React, {useState} from "react";

import Date from "../Date.jsx";
import { Heading2 } from "../Headings.jsx";
import { retrieveIncidents } from "../../services/api";
import Row from "../Row.jsx"
import StatusText from "../StatusText.jsx";
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
        <div className="m-top-2">
            <Heading2>{incident.name}</Heading2>
            {incident.duration && <div className="fs-22">{incident.duration} мин</div> }
            <StatusText status={incident.status}/>
            <Row className="fs-16">
                <Date date={incident.date}/>
            </Row>
        </div>
    );
}
