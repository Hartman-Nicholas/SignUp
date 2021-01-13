require("./models/user");
require("./db/mongoose");
require("./services/passport");

const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRouter = require("./routers/authRoutes");

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(authRouter);

module.exports = app;
