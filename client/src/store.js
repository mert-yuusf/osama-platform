import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/userSlice";
import alertSlice from "./features/alertSlice";
import skillSlice from "./features/skillSlice";
import workSlice from "./features/workSlice";
import toastSlice from "./features/toastSlice";
export const store = configureStore({
    reducer: {
        user: userSlice,
        alert: alertSlice,
        skill: skillSlice,
        work: workSlice,
        toast: toastSlice
    }
})