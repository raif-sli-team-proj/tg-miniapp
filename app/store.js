import { configureStore } from "@reduxjs/toolkit";
import statusesReducer from "./services/statusesSlice";
import sliReducer from "./services/sliSlice";
import notificationsSettingsReducer from "./services/notificationsSettingsSlice";
import incidentsReducer from "./services/incidentsSlice";
import commentsReducer from "./services/commentsSlice";

export default configureStore({
    reducer: {
        statuses: statusesReducer,
        sli: sliReducer,
        notificationSettings: notificationsSettingsReducer,
        incidents: incidentsReducer,
        comments: commentsReducer,
    },
})
