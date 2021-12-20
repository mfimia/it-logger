import { SET_ALERT, REMOVE_ALERT } from "./types";

// Fire alert
export const setAlert = (msg, type, temp = false) => {
  if (temp) {
    setTimeout(() => {
      clearAlert();
    }, 3000);
  }
  return { type: SET_ALERT, payload: { msg, type } };
};

// Clear alert
export const clearAlert = () => {
  return { type: REMOVE_ALERT };
};
