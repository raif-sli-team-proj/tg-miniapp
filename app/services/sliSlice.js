import { createSlice } from '@reduxjs/toolkit';

import config from '../config';
import { ApiRequestStatus } from './slicesBase';

export const TimeFrames = ["1h", "1d", "1w"];
export const TimeFrameTranslations = {
    "1h": "1ч",
    "1d": "1д",
    "1w": "1н",
};

export const sliSlice = createSlice({
    name: 'sli',
    initialState: buildInitialState(config),
    reducers: {
        sliFetched: (state, {payload}) => {
            const {serviceName, frameSize} = payload;
            state.items[serviceName][frameSize].apiRequestStatus = ApiRequestStatus.Done;
            if (payload.error != null) {
                state.error = payload.error;
                state.error.time = new Date();
                return;
            }
            state.items[serviceName][frameSize].error = null;
            saveSliMetrics(state, serviceName, frameSize, payload.metrics);
        },
        sliRequested: (state, {payload}) => {
            const {serviceName, frameSize} = payload;
            state.items[serviceName][frameSize].apiRequestStatus = ApiRequestStatus.InProgress;
        },
        selectedNewTimeFrame: (state, {payload}) => {
            state.selectedTimeFrame = payload;
        }
    }
});

function buildInitialState(config) {
    let sli = {
        items: {},
    };
    for (let srvName of config.serviceNames) {
        sli.items[srvName] = {};
        for (let tf of TimeFrames) {
            sli.items[srvName][tf] = {
                apiRequestStatus: ApiRequestStatus.Initial,
            };
        }
        sli.selectedTimeFrame = TimeFrames[0];
    }
    return sli;
}

function saveSliMetrics(state, serviceName, frameSize, metrics) {
    for (let m of metrics) {
        if (!m.dateTime.endsWith('Z')) {
            m.dateTime += 'Z';  // Required to parse date in UTC timezone
        }
    }
    metrics.sort((a, b) => {
        const aTimestamp = new Date(a.dateTime).valueOf();
        const bTimestamp = new Date(b.dateTime).valueOf();
        return aTimestamp - bTimestamp;
    });
    if (metrics.length > 50)
        metrics = metrics.slice(-50);
    state.items[serviceName][frameSize]["metrics"] = metrics;

}

export function getRequestStatus(state, serviceName, timeFrame) {
    if (state.items[serviceName] === undefined)
        return ApiRequestStatus.Initial;
    if (state.items[serviceName][timeFrame] === undefined)
        return ApiRequestStatus.Initial;
    return state.items[serviceName][timeFrame].apiRequestStatus;
}

export function getError(state, serviceName, timeFrame) {
    return state.items[serviceName][timeFrame].error;
}

export function getAvailableSliMetrics(state, serviceName, timeFrame) {
    if (state.items[serviceName] === undefined)
        return [];
    if (state.items[serviceName][timeFrame] === undefined)
        return [];
    return state.items[serviceName][timeFrame].metrics ?? [];
}

export const { selectedNewTimeFrame, sliRequested, sliFetched } = sliSlice.actions;
export default sliSlice.reducer;
