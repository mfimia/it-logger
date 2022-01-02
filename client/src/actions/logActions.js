import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  UPDATE_LOG,
  DELETE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "./types";

// Get the logs. Async syntax. Returns a function
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("api/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err,
    });
  }
};

// Add new log. Async syntax. Returns a function
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("api/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err,
    });
  }
};

// Delete log from server. Async syntax. Returns a function
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(`api/logs/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err,
    });
  }
};

// Update log from server. Async syntax. Returns a function
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`api/logs/${log._id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data.sentLog,
    });

    dispatch({
      type: GET_LOGS,
      payload: data.logs,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err,
    });
  }
};

// Search the logs. Async syntax. Returns a function
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`api/logs?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err,
    });
  }
};

// Set current log
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// Clear current log
export const clearCurrent = (log) => {
  return {
    type: CLEAR_CURRENT,
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
