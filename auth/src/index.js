const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");

const connect = require("./connections/mongo");
const CurrentUserRouter = require("./routes/current-user");
const SignupRouter = require("./routes/signup");
const SignInRouter = require("./routes/signin");
const SignOutRouter = require("./routes/signout");
const ErrorHandler = require("../../common/middlewares/error-handler");

connect();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

// Current User Router and Wiring up Cookie Session
app.use(CurrentUserRouter);
app.use(SignupRouter);
app.use(SignOutRouter);
app.use(SignInRouter);
app.use(ErrorHandler);

app.listen(4001, () => {
  console.log("auth-service listen on port 4001");
});
