import React, {useState} from "react";

import Date from "./Date.jsx";
import Heading2 from "./Heading2.jsx";
import { retrieveIncidents } from "../services/IncidentsHistory.js";
import Row from "./Row.jsx"
import StatusText from "./StatusText.jsx";

export default function IncidentsHistory({serviceName}) {
    const [incidents, setIncidents] = useState(null);
    if (incidents === null) {
        retrieveIncidents(serviceName).then((incidents) => {
            setIncidents(incidents);
        })
    }
    return (
        <>
            <div className="m-top-4"><Heading2>История инцидентов</Heading2></div>
            {(incidents
                ? <>{incidents.map(item => <Incident key={item.date} incident={item}/>)}</>
                : <p>Loading...</p>
            )}
        </>
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
