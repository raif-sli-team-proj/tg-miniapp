import { createSlice } from '@reduxjs/toolkit';

import config from '../config';
import { ApiRequestStatus } from './slicesBase';

export const sliSlice = createSlice({
    name: 'sli',
    initialState: buildInitialState(config),
    reducers: {
        sliFetched: (state, {payload}) => {
            state.apiRequestStatus = ApiRequestStatus.Done;
            if (payload.error != null) {
                state.error = payload.error;
                return;
            }
            state.error = null;
            state.items[payload.serviceName][payload.frameSize] = payload.metrics;
        },
        sliRequested: (state) => {
            state.apiRequestStatus = ApiRequestStatus.InProgress;
        }
    }
});

function buildInitialState(config) {
    let sli = {
        apiRequestStatus: ApiRequestStatus.Initial,
        items: {},
        error: null,
    };
    for (let srvName of config.services) {
        sli.items[srvName] = {};
    }
    return sli;
}

export const { sliRequested, sliFetched } = sliSlice.actions;
export default sliSlice.reducer;
