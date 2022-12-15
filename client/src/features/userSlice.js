import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";
import {
    addTokenToLocalStorage,
    addUserToLocalStorage,
    clearLocalStorage,
    getTokenFromLocalStorage,
    getUserFromLocalStorage
} from "../utils/localStorage";
import { displayAlert, removeAlert } from "./alertSlice";
import { showToast } from "./toastSlice";

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage(),
    token: null,
    isAuthenticated: false
}

export const registerUser = createAsyncThunk(
    "user/register",
    async (user, thunkAPI) => {
        try {
            let response = await axiosInstance.post("/api/auth/signup", user);
            const { result } = response.data;
            addTokenToLocalStorage(result);
            thunkAPI.dispatch(displayAlert({ message: "Account has created successfully", type: "success" }))
            setTimeout(() => {
                thunkAPI.dispatch(removeAlert())
            }, 3000);
            return { result }
        } catch (error) {
            const { message } = error.response.data;
            thunkAPI.dispatch(displayAlert({ message: message, type: "danger" }))
            thunkAPI.dispatch(displayAlert({ message: message, type: "danger" }))
            setTimeout(() => {
                thunkAPI.dispatch(removeAlert())
            }, 3000);
            console.log(`💥 ${error.message}`);
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/login",
    async (user, thunkAPI) => {
        try {
            let response = await axiosInstance.post("/api/auth/login", user);
            const { result } = response.data;
            await addTokenToLocalStorage(result);
            await thunkAPI.dispatch(getProfile());
            thunkAPI.dispatch(displayAlert({ message: "Welcome again", type: "success" }))
            setTimeout(() => {
                thunkAPI.dispatch(removeAlert())
            }, 3000);
            return { result }
        } catch (error) {
            const { message } = error.response.data;
            thunkAPI.dispatch(displayAlert({ message: message, type: "danger" }))
            setTimeout(() => {
                thunkAPI.dispatch(removeAlert())
            }, 3000);
            console.log(`💥 ${error.message}`);
        }
    }
)



export const getProfile = createAsyncThunk(
    "user/profile",
    async (thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();
            const response = await axiosInstance.get("/api/users/profile", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const { result } = response.data;
            await addUserToLocalStorage(result);
            return { result };
        } catch (error) {
            const { message } = error.response.data;
            thunkAPI.dispatch(displayAlert({ message: message, type: "danger" }))
            console.log(`💥 ${error.message}`);
        }
    }
)


export const updateProfile = createAsyncThunk(
    "user/update",
    async (user, thunkAPI) => {
        try {
            const token = getTokenFromLocalStorage();
            const response = await axiosInstance.put("/api/users/profile", user, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const { result } = response.data;
            addUserToLocalStorage(result);
            thunkAPI.dispatch(displayAlert({ message: "Profile has updated successfully", type: "success" }))
            setTimeout(() => {
                thunkAPI.dispatch(removeAlert());
            }, 3000);
            return { result };
        } catch (error) {
            const { message } = error.response.data;
            thunkAPI.dispatch(displayAlert({ message: message, type: "danger" }))
            console.log(`💥 ${error.message}`);
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.token = null;
            state.user = null;
            clearLocalStorage();
        }
    },
    extraReducers: (builder) => {
        // register
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.token = null;
            state.isAuthenticated = false;
        });

        // login
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            const { result } = action.payload;
            if (result) {
                state.token = action.payload.result;
                state.isAuthenticated = true;
            }

        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
        });

        // get profile
        builder.addCase(getProfile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.result;
        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.isLoading = false;
        });

        // update profile
        builder.addCase(updateProfile.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.result;
        });
        builder.addCase(updateProfile.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;