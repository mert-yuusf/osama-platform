import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialValues = {
    displayToast: false,
    title: "",
    content: "",
    type: ""
}

const toastSlice = createSlice({
    name: "toast",
    initialValues,
    reducers: {
        showToast: (state, action) => {
            console.log(action.payload);
        },

        closeToast: (state, action) => {
            console.log(action.payload);
        }
    }
})


export const { showToast, closeToast } = toastSlice.actions;

export default toastSlice;