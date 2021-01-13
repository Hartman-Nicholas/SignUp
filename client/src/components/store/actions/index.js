import axios from "axios";
import * as actionTypes from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({
    type: actionTypes.FETCH_USER,
    payload: res.data,
  });
};

export const updateFormState = (form, state) => ({
  type: actionTypes.UPDATE_FORM_STATE,
  form,
  payload: state,
});
