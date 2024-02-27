import { createSlice } from "@reduxjs/toolkit";

import config from '../config';
import { ApiRequestStatus } from './slicesBase';
import { removeDuplicates } from "../utils";

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: buildInitialState(config),
    reducers: {
        commentsFetched: (state, {payload}) => {
            onCommentsFetched(state, {...payload});
        },
        commentsRequested: (state, {payload}) => {
            onCommentsRequested(state, payload.serviceId, payload.incidentId)
        }
    }
});

export function getRequestStatus(state, serviceId, incidentId) {
    const subState = state.items[serviceId][incidentId];
    if (subState == null)
        return ApiRequestStatus.Initial;
    if (subState.error && subState.lastErrorTime.getTime() + config.failed_request_retry_period * 1000 < (new Date()).getTime())
        return ApiRequestStatus.Initial;
    return state.items[serviceId][incidentId].apiRequestStatus;
}

export function getAvailableComments(state, serviceId, incidentId) {
    if (state.items[serviceId][incidentId] == null)
        return [];
    return state.items[serviceId][incidentId].comments.data;
}

function buildInitialState(config) {
    let comments = {
        items: {}  // keys are services names
    };
    for (let srvName of config.serviceNames) {
        comments.items[srvName] = {};  // keys are incidents' ids
    }
    return comments;
}

function onCommentsRequested(state, serviceId, incidentId) {
    if (state.items[serviceId][incidentId] == null) {
        state.items[serviceId][incidentId] = {
            apiRequestStatus: ApiRequestStatus.InProgress,
            comments: {data: []}
        };
    }
}

function onCommentsFetched(state, {serviceId, incidentId, error, comments}) {
    const subState = state.items[serviceId][incidentId];
    subState.apiRequestStatus = ApiRequestStatus.Done;
    if (error != null) {
        subState.error = error;
        subState.lastErrorTime = new Date();
        return;
    }
    subState.error = null;
    subState.lastErrorTime = null;
    if (comments.length == 0)
        return;
    addNewCommentsToState(state, comments, serviceId, incidentId);
}

function addNewCommentsToState(state, commentsDto, serviceId, incidentId) {
    const subState = state.items[serviceId][incidentId];
    state.items[serviceId][incidentId].comments = {
        data: removeDuplicates([...subState.comments.data, ...commentsDto], (a, b) => { return a.id - b.id; })
    };
}

export const { commentsRequested, commentsFetched } = commentsSlice.actions;
export default commentsSlice.reducer;
