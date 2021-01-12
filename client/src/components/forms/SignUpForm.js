import React from "react";
import { Form, Field, FormSpy } from "react-final-form";
import createDecorator from "final-form-focus";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import FormStateToRedux from "./FormStateToRedux";
import checkPassStrength from "../../utils/passwordCheck";

const required = (value) => (value ? undefined : "Required");
const emailCheck = (value) => {
  return validateEmails(value || "");
};

const passCheck = (value) => {
  switch (checkPassStrength(value || "")) {
    case "Too Weak":
      return "Too Weak";
    default:
      return;
  }
};

const showPassStrength = (value) => {
  switch (checkPassStrength(value || "")) {
    case "Too Weak":
      return;
    case "weak":
      return "weak";
    case "good":
      return "good";
    case "strong":
      return "strong";
    default:
      return;
  }
};

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
const focusOnError = createDecorator();

const onSubmit = () => {
  console.log("Replace Me");
};

const SignUpForm = (props) => {
  const { userName, password, email } = props.initialValues;
  return (
    <Form
      onSubmit={onSubmit}
      decorators={[focusOnError]}
      subscription={{
        submitting: true,
      }}
    >
      {({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className="sign-up-form">
          <h2 className="title">Sign up</h2>
          <FormStateToRedux form="SurveyForm" />
          <Field name="userName" placeholder={userName} validate={required}>
            {({ input, meta, placeholder }) => (
              <div
                className={`field ${
                  meta.active ? "active input-field" : "input-field"
                }`}
              >
                <i className="fas fa-user"></i>
                <input {...input} placeholder={placeholder} />
                {meta.error && meta.touched && (
                  <span className="red-text" style={{ marginBottom: "20px" }}>
                    {meta.error}
                  </span>
                )}
              </div>
            )}
          </Field>
          <Field
            name="email"
            placeholder={email}
            validate={composeValidators(required, emailCheck)}
          >
            {({ input, meta, placeholder }) => (
              <div
                className={`field ${
                  meta.active ? "active input-field" : "input-field"
                }`}
              >
                <i className="fas fa-lock"></i>
                <input {...input} placeholder={placeholder} />
                {meta.error && meta.touched && (
                  <span className="red-text" style={{ marginBottom: "20px" }}>
                    {meta.error}
                  </span>
                )}
              </div>
            )}
          </Field>
          <Field
            name="password"
            placeholder={password}
            validate={composeValidators(required, passCheck)}
          >
            {({ input, meta, placeholder }) => (
              <div
                className={`field ${
                  meta.active ? "active input-field" : "input-field"
                }`}
              >
                <i className="fas fa-lock"></i>
                <input {...input} placeholder={placeholder} />
                {meta.valid && <span>{showPassStrength(input.value)}</span>}
                {meta.error && meta.touched && (
                  <span className="red-text" style={{ marginBottom: "20px" }}>
                    {meta.error}
                  </span>
                )}
              </div>
            )}
          </Field>
          <input
            className="btn solid"
            value="Login"
            type="submit"
            disabled={pristine || submitting}
          />
          <p className="social-text">Or Sign in with social media</p>
          <div className="social-media">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
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
  );
};

export default SignUpForm;
