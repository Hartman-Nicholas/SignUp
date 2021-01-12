import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions/index";

const SurveyList = () => {
  const surveys = useSelector((state) => state.surveys);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchSurveys);
  }, [dispatch]);

  const renderSurveyList = () => {
    if (surveys) {
      console.log(surveys);
      return surveys.reverse().map((survey) => {
        return (
          <div className="card blue-grey darken-1" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.surveyTitle}</span>
              <p>{survey.body}</p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <button>Yes: {survey.yes}</button>
              <button>No: {survey.no}</button>
              <button
                className="right"
                onClick={() => {
                  dispatch(actions.deleteSurvey(survey._id));
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      });
    }
    return <div>Loading..</div>;
  };

  return <div>{renderSurveyList()}</div>;
};

export default SurveyList;
