import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = {
  loading: false,
  alert: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return action.payload;
    case REMOVE_ALERT:
      return null;
    default:
      return state;
  }
};
