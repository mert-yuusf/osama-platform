import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import { displayAlert, removeAlert } from "../features/alertSlice";

import {
    getTokenFromLocalStorage,
} from "../utils/localStorage";


const initialState = {
    isLoading: false,
    works: [],
    selectedWork: null
}


const getAllWorks = createAsyncThunk(
    "work/get-all",
    async (thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();
            const response = await axiosInstance.get("/api/experiences", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const { result } = response.data;
            return { result };
        } catch (error) {
            const { message } = error.response.data;
            thunkAPI.dispatch(displayAlert({ message: message, type: "danger" }));
            setTimeout(() => {
                removeAlert();
            }, 3000);
            console.log(`💥 ${error.message}`);
        }
    }
)

const getOneWork = createAsyncThunk(
    "work/get-one",
    async (workId, thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();
            const response = await axiosInstance.get(`/api/experiences/${workId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const { result } = response.data;
            return { result };
        } catch (error) {
            const { message } = error.response.data;
            thunkAPI.dispatch(displayAlert({ message: message, type: "danger" }));
            setTimeout(() => {
                removeAlert();
            }, 3000);
            console.log(`💥 ${error.message}`);
        }
    }
)

const createWork = createAsyncThunk(
    "work/create",
    async (work, thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();
            await axiosInstance.post("/api/experiences", work, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        } catch (error) {
            const { message } = error.response.data;
            thunkAPI.dispatch(displayAlert({ message: message, type: "danger" }));
            setTimeout(() => {
                removeAlert();
            }, 3000);
            console.log(`💥 ${error.message}`);
        }
    }
)

const removeWork = createAsyncThunk(
    "work/remove",
    async (workId, thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();
            await axiosInstance.delete(`/api/experiences/${workId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        } catch (error) {
            const { message } = error.response.data;
            thunkAPI.dispatch(displayAlert({ message: message, type: "danger" }));
            setTimeout(() => {
                removeAlert();
            }, 3000);
            console.log(`💥 ${error.message}`);
        }
    }
)

const updateWork = createAsyncThunk(
    "work/update",
    async ({ workId, work }, thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();

            const response = await axiosInstance.put(`/api/experiences/${workId}`, work, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const { result } = response.data;
            return { result };
        } catch (error) {
            const { message } = error.response.data;
            thunkAPI.dispatch(displayAlert({ message: message, type: "danger" }));
            setTimeout(() => {
                removeAlert();
            }, 3000);
            console.log(`💥 ${error.message}`);
        }
    }
)

const workSlice = createSlice({
    name: "work",
    initialState,

    reducers: {
        cancelEditing: (state) => {
            state.selectedWork = null;
        }
    },

    extraReducers: (builder) => {
        // get all experiences
        builder.addCase(getAllWorks.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getAllWorks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.works = action.payload.result
        });
        builder.addCase(getAllWorks.rejected, (state) => {
            state.isLoading = false;
        });
        // get one skill
        builder.addCase(getOneWork.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOneWork.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedWork = action.payload.result
        });
        builder.addCase(getOneWork.rejected, (state) => {
            state.isLoading = false;
        });

        // add new skill
        builder.addCase(createWork.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(createWork.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(createWork.rejected, (state) => {
            state.isLoading = false;
        });
        // update skill
        builder.addCase(updateWork.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(updateWork.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedWork = action.payload.result;
        });
        builder.addCase(updateWork.rejected, (state) => {
            state.isLoading = false;
        });
        // remove skill
        builder.addCase(removeWork.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(removeWork.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(removeWork.rejected, (state) => {
            state.isLoading = false;
        });
    }
})

export {
    getAllWorks,
    getOneWork,
    createWork,
    removeWork,
    updateWork
}
export const { cancelEditing } = workSlice.actions;
export default workSlice.reducer;