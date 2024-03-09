import React from "react";

import { Heading2 } from "../Headings/index.jsx";
import { retrieveIncidents } from "../../services/api.js";
import useStyles from "./style.js";
import { useDispatch, useSelector } from "react-redux";
import { ApiRequestStatus } from "../../services/slicesBase.js";
import { incidentsFetched, incidentsRequested } from "../../services/incidentsSlice.js";
import IncidentInfo from "../../services/Incident.js";
import IncidentCard from "./IncidentCard.jsx";
import { serviceNameToServiceId } from "../../services/Service.js";

export default function IncidentsHistory({serviceName, className}) {
    const incidentsSlice = useSelector(state => state.incidents);
    const dispatch = useDispatch();
    const styles = useStyles();

    if (incidentsSlice.apiRequestStatus == ApiRequestStatus.Initial) {
        dispatch(incidentsRequested());
        retrieveIncidents(serviceName).then(
            newIncidents => dispatch(incidentsFetched(newIncidents))
        );
    }

    const incidents = prepareIncidentDtos(incidentsSlice, serviceNameToServiceId(serviceName))

    return (
        <div className={className + ' ' + styles.incidentsHistory}>
            <Heading2>История инцидентов</Heading2>
            {(incidents
                ? <>{incidents.map(item => <IncidentCard key={item.incidentId} incident={item}/>)}</>
                : <p>Loading...</p>
            )}
        </div>
    );
}

function prepareIncidentDtos(incidentsSlice, serviceName) {
    const incidents = [];
    Object.keys(incidentsSlice.items[serviceName]).forEach(incidentId => {
        incidents.push(new IncidentInfo(incidentsSlice.items[serviceName][incidentId]));
    });
    incidents.sort((a, b) => {
        const timestampA = a.dateTime.valueOf();
        const timestampB = b.dateTime.valueOf();
        return timestampB - timestampA;  // Using reverse order
    });

    return incidents;
}
