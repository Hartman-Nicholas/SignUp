const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendSurveyEmail = (survey) => {
  console.log(survey);
  const { recipients, surveyTitle, subject, body, id } = survey;

  sgMail
    .sendMultiple({
      to: recipients,
      from: "hartn001@outlook.com",
      subject: subject,
      html: `
          <html>
        <body>
          <div style="text-align: center;">
          <h1>${surveyTitle}<h1>
            <h3>I'd like your input!</h3>
            <p>Please answer the following questions</p>
            <p>${body}</p>
            <div>
              <a href="${process.env.REDIRECT_DOMAIN}/api/surveys/${id}/yes">Yes</a>
            </div>
            <div>
              <a href="${process.env.REDIRECT_DOMAIN}/api/surveys/${id}/no">No</a>
            </div>
          </div>
        </body>
      </html>
      `,
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendSurveyEmail,
};
