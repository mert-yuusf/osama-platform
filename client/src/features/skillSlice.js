import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import { displayAlert, removeAlert } from "../features/alertSlice";

import {
    getTokenFromLocalStorage,
} from "../utils/localStorage";


const initialState = {
    isLoading: false,
    skills: [],
    selectedSkill: null
}


const getAllSkills = createAsyncThunk(
    "skill/get-all",
    async (thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();
            const response = await axiosInstance.get("/api/skills", {
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

const getOneSkill = createAsyncThunk(
    "skill/get-one",
    async (skillId, thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();
            const response = await axiosInstance.get(`/api/skills/${skillId}`, {
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

const createSkill = createAsyncThunk(
    "skill/create",
    async (skill, thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();
            await axiosInstance.post("/api/skills", skill, {
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

const removeSkill = createAsyncThunk(
    "skill/remove",
    async (skillId, thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();
            await axiosInstance.delete(`/api/skills/${skillId}`, {
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

const updateSkill = createAsyncThunk(
    "skill/update",
    async ({ skillId, skill }, thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();
            console.log(skill);
            const response = await axiosInstance.put(`/api/skills/${skillId}`, skill, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const { result } = response.data;
            console.log({ result });
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

const skillSlice = createSlice({
    name: "skill",
    initialState,

    reducers: {
        cancelEditing: (state) => {
            state.selectedSkill = null;
        }
    },

    extraReducers: (builder) => {
        // get all skills
        builder.addCase(getAllSkills.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getAllSkills.fulfilled, (state, action) => {
            state.isLoading = false;
            state.skills = action.payload.result
        });
        builder.addCase(getAllSkills.rejected, (state) => {
            state.isLoading = false;
        });
        // get one skill
        builder.addCase(getOneSkill.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOneSkill.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.selectedSkill = action.payload.result
        });
        builder.addCase(getOneSkill.rejected, (state) => {
            state.isLoading = false;
        });

        // add new skill
        builder.addCase(createSkill.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(createSkill.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(createSkill.rejected, (state) => {
            state.isLoading = false;
        });
        // update skill
        builder.addCase(updateSkill.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(updateSkill.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedSkill = action.payload.result;
        });
        builder.addCase(updateSkill.rejected, (state) => {
            state.isLoading = false;
        });
        // remove skill
        builder.addCase(removeSkill.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(removeSkill.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(removeSkill.rejected, (state) => {
            state.isLoading = false;
        });
    }
})

export {
    getAllSkills,
    getOneSkill,
    createSkill,
    removeSkill,
    updateSkill
}
export const { cancelEditing } = skillSlice.actions;
export default skillSlice.reducer;