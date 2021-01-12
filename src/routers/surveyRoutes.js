const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const express = require("express");
const requireCredits = require("../middleware/requireCredits");
const requireLogin = require("../middleware/requireLogin");
const router = new express.Router();
const Survey = mongoose.model("Survey");
const { sendSurveyEmail } = require("../emails/surveyEmail");

router.get("/api/surveys/:surveyId/:choice", (req, res) => {
  res.send("Thank you for completing the survey");
});

router.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
  const { surveyTitle, subject, body, recipients } = req.body;
  const survey = new Survey({
    surveyTitle,
    subject,
    body,
    recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });
  try {
    await sendSurveyEmail(survey);
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    res.status(422);
  }
});

router.post("/api/surveys/webhooks", (req, res) => {
  const p = new Path("/api/surveys/:surveyId/:choice");

  _.chain(req.body)
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();

  res.send({});
});

router.get("/api/surveys", requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false,
  });
  res.send(surveys);
});

router.delete("/api/surveys/:id", requireLogin, async (req, res) => {
  try {
    const survey = await Survey.findByIdAndDelete(req.params.id);

    if (!survey) {
      return res.status(404).send();
    }

    res.send(survey);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
