import React from "react";
import { FormSpy } from "react-final-form";
// import { useDispatch } from "react-redux";
import { updateFormState } from "../store/actions/index";
import { connect } from "react-redux";

const FormStateToRedux = ({ form, updateFormState }) => (
  <FormSpy onChange={(state) => updateFormState(form, state)} />
);

export default connect(undefined, { updateFormState })(FormStateToRedux);
