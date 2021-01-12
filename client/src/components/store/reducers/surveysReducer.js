import * as actionTypes from "../actions/types";

const surveysReducer = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_SURVEYS:
      return action.payload;
    case actionTypes.DELETE_SURVEY:
      return state.filter((state) => state._id !== action.payload);

    default:
      return state;
  }
};

export default surveysReducer;
