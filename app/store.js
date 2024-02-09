import { configureStore } from "@reduxjs/toolkit";
import statusesReducer from "./services/statusesSlice";

export default configureStore({
    reducer: {
        statuses: statusesReducer,
    },
})
