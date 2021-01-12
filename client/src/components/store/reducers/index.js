import { combineReducers } from "redux";
import authReducer from "./authReducer";
import formReducer from "./formReducer";
import surveyReducer from "./surveysReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys: surveyReducer,
});
