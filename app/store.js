import { configureStore } from "@reduxjs/toolkit";
import statusesReducer from "./services/statusesSlice";
import sliReducer from "./services/sliSlice";
import notificationsSettingsReducer from "./services/notificationsSettingsSlice";

export default configureStore({
    reducer: {
        statuses: statusesReducer,
        sli: sliReducer,
        notificationSettings: notificationsSettingsReducer,
    },
})
