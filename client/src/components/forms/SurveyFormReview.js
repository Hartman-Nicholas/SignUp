import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions/index";
import history from "../../history";

const SurveyFormReview = ({ onCancel }) => {
  const form = useSelector((state) => state.form.SurveyForm.values);
  const dispatch = useDispatch();
  const { surveyTitle, subject, recipients, body } = form;
  return (
    <div>
      <h5>Please confirm your entry</h5>
      <div>
        <div>
          <label>Survey Title</label>
          <div>{surveyTitle}</div>
        </div>
      </div>
      <div>
        <div>
          <label>Subject Line</label>
          <div>{subject}</div>
        </div>
      </div>
      <div>
        <div>
          <label>Email Body</label>
          <div>{body}</div>
        </div>
      </div>
      <div>
        <div>
          <label>Recipient List</label>
          <div>{recipients}</div>
        </div>
      </div>

      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => dispatch(actions.submitSurvey(form, history))}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default SurveyFormReview;
