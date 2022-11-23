// ALERT ACTIONS
import { v4 as uuidv4 } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (message, alertType, options) => dispatch => {
	const id = uuidv4();

	dispatch({
		type: SET_ALERT,
		payload: { message, alertType, id }
	});

	setTimeout(() => {
		dispatch({
			type: REMOVE_ALERT, payload: id
		})
	}, options.timeout || 2000);
}