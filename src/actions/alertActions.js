import { SET_ALERT, REMOVE_ALERT } from "./types";

// Fire alert
export const setAlert = (msg, type, temp = false) => {
  dispatch({ type: SET_ALERT, payload: { msg, type } });
  temp && setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
};

// Clear alert
export const clearAlert = () => {
  dispatch({ type: REMOVE_ALERT });
};
