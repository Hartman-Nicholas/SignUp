import React from "react";
import { Form, Field, FormSpy } from "react-final-form";
import createDecorator from "final-form-focus";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import FormStateToRedux from "./FormStateToRedux";

const required = (value) => (value ? undefined : "Required");
const emailCheck = (value) => {
  const errors = validateEmails(value || "");
  return errors;
};
const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
const focusOnError = createDecorator();

const SurveyForm = (props) => {
  const { surveyTitle, subject, body, recipients } = props.initialValues;
  return (
    <div className="ui form error">
      <Form
        onSubmit={props.onSubmit}
        decorators={[focusOnError]}
        keepDirtyOnReinitialize
        subscription={{
          submitting: true,
        }}
      >
        {({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <FormStateToRedux form="SurveyForm" />
            <Field
              name="surveyTitle"
              placeholder={surveyTitle}
              validate={required}
            >
              {({ input, meta, placeholder }) => (
                <div className={`field ${meta.active ? "active" : ""}`}>
                  <label>Survey Title</label>
                  <input
                    {...input}
                    style={{ marginBottom: "5px" }}
                    placeholder={placeholder}
                  />
                  {meta.error && meta.touched && (
                    <span className="red-text" style={{ marginBottom: "20px" }}>
                      {meta.error}
                    </span>
                  )}
                </div>
              )}
            </Field>
            <Field name="subject" placeholder={subject} validate={required}>
              {({ input, meta, placeholder }) => (
                <div className={`field ${meta.active ? "active" : ""}`}>
                  <label>Subject Line</label>
                  <input
                    {...input}
                    style={{ marginBottom: "5px" }}
                    placeholder={placeholder}
                  />
                  {meta.error && meta.touched && (
                    <span className="red-text" style={{ marginBottom: "20px" }}>
                      {meta.error}
                    </span>
                  )}
                </div>
              )}
            </Field>
            <Field name="body" placeholder={body} validate={required}>
              {({ input, meta, placeholder }) => (
                <div className={`field ${meta.active ? "active" : ""}`}>
                  <label>Email Body</label>
                  <input
                    {...input}
                    style={{ marginBottom: "5px" }}
                    placeholder={placeholder}
                  />
                  {meta.error && meta.touched && (
                    <span className="red-text" style={{ marginBottom: "20px" }}>
                      {meta.error}
                    </span>
                  )}
                </div>
              )}
            </Field>
            <Field
              name="recipients"
              placeholder={recipients}
              validate={composeValidators(required, emailCheck)}
            >
              {({ input, meta, placeholder }) => (
                <div className={`field ${meta.active ? "active" : ""}`}>
                  <label>Recipient List</label>
                  <input
                    {...input}
                    style={{ marginBottom: "5px" }}
                    placeholder={placeholder}
                  />
                  {meta.error && meta.touched && (
                    <span className="red-text" style={{ marginBottom: "20px" }}>
                      {meta.error}
                      {console.log(meta.error)}
                    </span>
                  )}
                </div>
              )}
            </Field>
            <Link to="/surveys" className="red btn-flat white-text">
              Cancel
            </Link>
            <button
              className="teal btn-flat right white-text"
              type="submit"
              disabled={pristine || submitting}
            >
              Next
              <i className="material-icons right">done</i>
            </button>
            <FormSpy subscription={{ submitSucceeded: true, values: true }}>
              {({ submitSucceeded }) => {
                if (submitSucceeded) {
                  return <Redirect to="/surveys/new" />;
                }
                return <div></div>;
              }}
            </FormSpy>
            <FormStateToRedux form="SurveyForm" />
                        
          </form>
        )}
      </Form>
    </div>
  );
};

export default SurveyForm;
