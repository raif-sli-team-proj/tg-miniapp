import { createSlice } from '@reduxjs/toolkit';

import config from '../config';
import { ApiRequestStatus } from './slicesBase';

export const statusesSlice = createSlice({
    name: 'statuses',
    initialState: buildInitialState(config),
    reducers: {
        statusesFetched: (state, {payload}) => {  // payload is array of ServiceInfo
            // FIXME: I do not check whether `payload` contains the complete list of requests services or not.
            for (let srv of payload) {
                state.items[srv.name] = srv;
            }
            state.apiRequestStatus = ApiRequestStatus.Done;
        },
        statusesRequested: (state) => {
            state.apiRequestStatus = ApiRequestStatus.InProgress;
        }
    }
});

function buildInitialState(config) {
    let statuses = {
        apiRequestStatus: ApiRequestStatus.Initial,
        items: {}
    };
    for (let srvName of config.services) {
        statuses.items[srvName] = null;
    }
    return statuses;
}

export const { statusesRequested, statusesFetched } = statusesSlice.actions;
export default statusesSlice.reducer;
