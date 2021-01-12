import * as actionTypes from "../actions/types";

const formReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_FORM_STATE:
      return {
        ...state,
        [action.form]: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;
