import React, { useState } from "react";
import SignInForm from "./forms/SignInForm";
import SignUpForm from "./forms/SignUpForm";
import log from "../img/log.svg";
import register from "../img/register.svg";
import { SwitchTransition, CSSTransition } from "react-transition-group";

const Landing = () => {
  const [showSignIn, setSignIn] = useState(true);

  const renderContent = () => {
    return (
      <SwitchTransition>
        <CSSTransition
          key={showSignIn}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="fade"
        >
          <div>
            {showSignIn && (
              <div className="container">
                <div className="forms-container">
                  <div className="signin-signup">
                    <SignInForm
                      initialValues={{
                        userName: "User Name",
                        password: "Password",
                      }}
                    />
                  </div>
                </div>
                <div className="panels-container">
                  <div className="panel left-panel">
                    <div className="content">
                      <h3>New here ?</h3>
                      <p>Boilerplate for OAuth Logins</p>
                      <button
                        onClick={() => {
                          setSignIn(false);
                        }}
                        className="btn transparent"
                      >
                        Sign up
                      </button>
                    </div>
                    <img src={log} className="image" alt="rocketShip" />
                  </div>
                </div>
              </div>
            )}
            {!showSignIn && (
              <div className="container">
                <div className="forms-container">
                  <div className="signin-signup">
                    <SignUpForm
                      initialValues={{
                        userName: "User Name",
                        email: "Email",
                        password: "Password",
                      }}
                    />
                  </div>
                </div>
                <div className="panels-container">
                  <div className="panel right-panel">
                    <div className="content">
                      <h3>One of us ?</h3>
                      <p>Boilerplate for OAuth Logins</p>
                      <button
                        onClick={() => {
                          setSignIn(true);
                        }}
                        className="btn transparent"
                      >
                        Sign in
                      </button>
                    </div>
                    <img src={register} className="image" alt="Sign up desk" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    );
  };

  return <div>{renderContent()}</div>;
};

export default Landing;
