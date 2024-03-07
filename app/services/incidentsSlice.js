import { createSlice } from '@reduxjs/toolkit';

import config from '../config';
import { ApiRequestStatus } from './slicesBase';

/*
Single incident from API:
{
    "incidentId": 11,
    "serviceName": "QRC",
    "incidentStatus": "REPORTED",
    "incidentStartTime": "2024-02-24T14:39:31.172336",
    "incidentEndTime": null
}
*/

export const incidentsSlice = createSlice({
    name: 'incidents',
    initialState: buildInitialState(config),
    reducers: {
        incidentsFetched: (state, {payload}) => {
            // FIXME: I do not check whether `payload` contains the complete list of requests services or not.
            state.apiRequestStatus = ApiRequestStatus.Done;
            if (payload.error != null) {
                state.lastErrorTime = new Date();
                state.error = payload.error;
                return;
            }
            addNewIncidentsToState(state, payload.incidents);
        },
        incidentsRequested: (state) => {
            state.apiRequestStatus = ApiRequestStatus.InProgress;
        },
        incidentStatusUpdated: (state, {payload}) => {
            updateIncident(state, payload);
        }
    }
});

function buildInitialState(config) {
    let incidents = {
        apiRequestStatus: ApiRequestStatus.Initial,
        items: {}
    };
    for (let srvName of config.serviceNames) {
        incidents.items[srvName] = {};
    }
    return incidents;
}

function addNewIncidentsToState(state, incidents) {
    for (let incident of incidents) {
        state.items[incident.serviceName][incident.incidentId] = incident;
    }
}

function updateIncident(state, {serviceName, incidentId, newStatus}) {
    if (state.items[serviceName][incidentId] === undefined) {
        console.error(`Cannot update incident ${incidentId}, not found in state`);
        return;
    }
    const updatedIncident = {
        ...state.items[serviceName][incidentId],
        incidentStatus: newStatus,
    };
    state.items[serviceName][incidentId] = updatedIncident;
}

export const { incidentsRequested, incidentsFetched, incidentStatusUpdated } = incidentsSlice.actions;
export default incidentsSlice.reducer;
