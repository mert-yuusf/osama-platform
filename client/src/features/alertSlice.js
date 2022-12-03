import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showAlert: false,
    alertMessage: "",
    alertType: "",
}


const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        displayAlert: (state, action) => {
            console.log("Display Alert");
            state.showAlert = true;
            state.alertMessage = action.payload.message;
            state.alertType = action.payload.type;
        },
        removeAlert: (state) => {
            state.showAlert = false;
            state.alertMessage = "";
            state.alertType = "";
        }
    }
})


export const { displayAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;