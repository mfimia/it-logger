import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from "./types";

// Get the techs. Async syntax.
// Returns a function takes "dispatch" as paramenter
export const getTechs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("api/techs");
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err,
    });
  }
};

// Add a technician. Async syntax. Returns a function
export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("api/techs", {
      method: "POST",
      body: JSON.stringify(tech),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: ADD_TECH,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err,
    });
  }
};

// Delete a tech. Async syntax.
// Returns a function takes "dispatch" as paramenter
export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`api/techs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: DELETE_TECH,
      payload: id,
    });
    // When tech is deleted, we get the data and update the state
    const data = await res.json();
    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
