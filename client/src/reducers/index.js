import { combineReducers } from "redux";
import logReducer from "./logReducer";
import techReducer from "./techReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
  log: logReducer,
  tech: techReducer,
  alert: alertReducer,
});
