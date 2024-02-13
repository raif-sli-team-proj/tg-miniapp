import { configureStore } from "@reduxjs/toolkit";
import statusesReducer from "./services/statusesSlice";
import sliReducer from "./services/sliSlice";

export default configureStore({
    reducer: {
        statuses: statusesReducer,
        sli: sliReducer,
    },
})
