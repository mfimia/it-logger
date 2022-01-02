import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = {
  msg: "",
  type: "info",
  open: false,
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        open: true,
        msg: action.payload.msg,
        type: action.payload.type,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};
