const mongoose = require("mongoose");
const Recipient = require("./recipient").schema;

const surveySchema = new mongoose.Schema({
  surveyTitle: String,
  body: String,
  subject: String,
  recipients: [Recipient],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Relationship field
  dateSent: Date,
  lastResponded: Date,
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
