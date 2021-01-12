import axios from "axios";
import * as actionTypes from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({
    type: actionTypes.FETCH_USER,
    payload: res.data,
  });
};

export const handlePayment = (id, value) => async (dispatch) => {
  const res = await axios.post("/api/charge", {
    id,
    amount: value,
  });

  dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};

export const updateFormState = (form, state) => ({
  type: actionTypes.UPDATE_FORM_STATE,
  form,
  payload: state,
});

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};

export const fetchSurveys = async (dispatch) => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: actionTypes.FETCH_SURVEYS, payload: res.data });
};

export const deleteSurvey = (id) => async (dispatch) => {
  await axios.delete(`/api/surveys/${id}`);

  dispatch({ type: actionTypes.DELETE_SURVEY, payload: id });
};
