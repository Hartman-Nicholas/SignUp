import * as actionTypes from "../actions/types";

const authReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
