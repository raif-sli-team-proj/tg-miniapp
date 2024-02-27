import React from "react";

import { Heading2 } from "../Headings/index.jsx";
import { retrieveIncidents } from "../../services/api.js";
import useStyles from "./style.js";
import { useDispatch, useSelector } from "react-redux";
import { ApiRequestStatus } from "../../services/slicesBase.js";
import { incidentsFetched, incidentsRequested } from "../../services/incidentsSlice.js";
import config from "../../config.js";
import IncidentInfo from "../../services/Incident.js";
import IncidentCard from "./IncidentCard.jsx";

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

    const incidents = prepareIncidentDtos(incidentsSlice.items[serviceNameToServiceId(serviceName)])

    return (
        <div className={className + ' ' + styles.incidentsHistory}>
            <Heading2>История инцидентов</Heading2>
            {(incidents
                ? <>{incidents.toReversed().map(item => <IncidentCard key={item.incidentId} incident={item}/>)}</>
                : <p>Loading...</p>
            )}
        </div>
    );
}

function serviceNameToServiceId(serviceName) {
    return config.serviceNames[config.services.indexOf(serviceName)];
}

function prepareIncidentDtos(incidentsFromStore) {
    return incidentsFromStore.map(
        incident => new IncidentInfo(incident)
    );
}
