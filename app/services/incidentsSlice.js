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
        }
    }
});

function buildInitialState(config) {
    let incidents = {
        apiRequestStatus: ApiRequestStatus.Initial,
        items: {}
    };
    for (let srvName of config.serviceNames) {
        incidents.items[srvName] = [];
    }
    return incidents;
}

// Modifies input array
function removeDuplicatedIncidents(incidents) {
    const result = incidents.slice();
    result.sort((a, b) => {
        const timestampA = Date.parse(a.incidentStartTime);
        const timestampB = Date.parse(b.incidentStartTime);
        return timestampA - timestampB;
    });
    return result.filter((val, index, tmp) => {
        if (index === 0)
            return true;
        const timestampCur = Date.parse(val.incidentStartTime);
        const timestampPrev = Date.parse(tmp[index - 1].incidentStartTime);
        return timestampCur != timestampPrev;
    });
}

function addNewIncidentsToState(state, incidents) {
    for (let incident of incidents) {
        state.items[incident.serviceName].push(incident);
    }
    Object.keys(state.items).forEach((key) => {
        state.items[key] = removeDuplicatedIncidents(state.items[key]);
    });
}

export const { incidentsRequested, incidentsFetched } = incidentsSlice.actions;
export default incidentsSlice.reducer;
