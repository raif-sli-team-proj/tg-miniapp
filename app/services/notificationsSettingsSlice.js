import { createSlice } from '@reduxjs/toolkit';

import { ApiRequestStatus } from './slicesBase';

export const notificationsSettingsSlice = createSlice({
    name: 'notificationSettings',
    initialState: buildInitialState(),
    reducers: {
        notificationSettingsRetreived: (state, {payload}) => {
            state.retrieve.apiRequestStatus = ApiRequestStatus.Done;
            if (!checkError(payload, state.retrieve)) {
                state.error = null;
                state.lastErrorTime = null;
                state.settings = {
                    ...state.settings,
                    ...payload,
                }
            }
        },
        notificationSettingsRetreiveRequested: (state) => {
            state.retrieve.apiRequestStatus = ApiRequestStatus.InProgress;
        },
        notificationSettingsUpdateRequested: (state) => {
            state.update.apiRequestStatus = ApiRequestStatus.InProgress;
        },
        notificationSettingsUpdated: (state, {payload}) => {
            state.update.apiRequestStatus = ApiRequestStatus.Done;
            if (!checkError(payload, state.update)) {
                state.error = null;
                state.lastErrorTime = null;
                state.settings = {
                    ...state.settings,
                    ...payload
                };
            }
        }
    }
});

function buildInitialState() {
    let notificationSettings = {
        update: {
            apiRequestStatus: ApiRequestStatus.Initial,
            error: null,
            lastErrorTime: null,
        },
        retrieve: {
            apiRequestStatus: ApiRequestStatus.Initial,
            error: null,
            lastErrorTime: null,
        },
        settings: {},
    };
    return notificationSettings;
}

function checkError(payload, substate) {
    if (payload.error != null) {
        substate.error = payload.error;
        substate.lastErrorTime = new Date();
        return true;
    }
    return false;
}

export function hasRequestInProgress(state) {
    return state.retrieve.apiRequestStatus == ApiRequestStatus.InProgress || state.update.apiRequestStatus == ApiRequestStatus.InProgress;
}

export function isChatIdSubscribed(state, chatId) {
    return state.settings[chatId] ?? false;
}

export const {
    notificationSettingsRetreiveRequested,
    notificationSettingsRetreived,
    notificationSettingsUpdateRequested,
    notificationSettingsUpdated,
} = notificationsSettingsSlice.actions;
export default notificationsSettingsSlice.reducer;
