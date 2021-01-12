import React, { useState } from "react";
import SurveyForm from "./forms/SurveyForm";
import SurveyFormReview from "./forms/SurveyFormReview";

const SurveyNew = () => {
  const [showFormReview, setFormReview] = useState(false);

  const onSubmit = () => {
    setFormReview(true);
  };

  const onCancel = () => {
    setFormReview(false);
  };

  const renderContent = () => {
    if (!showFormReview) {
      return (
        <SurveyForm
          initialValues={{
            surveyTitle: "Title of Survey",
            subject: "Email subject line",
            body: "Place email body here",
            recipients: "example@gmail.com,test@outlook.com",
          }}
          onSubmit={onSubmit}
        />
      );
    }
    return <SurveyFormReview onCancel={onCancel} />;
  };

  return <div>{renderContent()}</div>;
};

export default SurveyNew;
