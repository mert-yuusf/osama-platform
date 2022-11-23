import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {setAlert} from "./alertActions";
import {Config} from "../config";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOAD_CURRENT_USER_SUCCESS,
	LOAD_CURRENT_USER_FAIL,
	LOGOUT
} from "./types";


export const registerUser = ({firstName, lastName, email, password, username, position}) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	}

	const body = JSON.stringify({firstName, lastName, email, password, username, position});

	try {
		const url = Config.BaseUrl + "/auth/signup"
		const response = await axios.post(url, body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: {
				token: response.data.result
			}
		})

		dispatch(getCurrentUser());
	} catch (error) {
		dispatch(setAlert(error.response.data.message, "danger", {timeout: 3000}))
		dispatch({
			type: REGISTER_FAIL,
		})
	}
}

export const loginUser = ({email, password}) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	}

	const body = JSON.stringify({email, password});

	try {
		const url = Config.BaseUrl + "/auth/login"
		const response = await axios.post(url, body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: {
				token: response.data.result
			}
		});
		dispatch(getCurrentUser());
	} catch (error) {
		dispatch(setAlert(error.response.data.message, "danger", {timeout: 3000}))
		console.log(`💥 ${error.message}`);
		console.log(error.response);
		dispatch({
			type: LOGIN_FAIL,
		})
	}
}

export const logoutUser = () =>async dispatch => {
	dispatch({
		type: LOGOUT
	})
}

export const getCurrentUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
		console.log(axios.defaults.headers.common["Authorization"]);
	}
	try {
		const url = Config.BaseUrl + "/users/me";
		const response = await axios.get(url);
		dispatch({
			type: LOAD_CURRENT_USER_SUCCESS,
			payload: {
				currentUser: response.data.result,
				isAuthenticated: true,
				isLoading: false
			}
		})
	} catch (error) {
		console.log(`💥 ${error.message}`);
		dispatch({
			type: LOAD_CURRENT_USER_FAIL
		})
	}
}

