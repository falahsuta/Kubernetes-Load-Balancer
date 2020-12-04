const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");

const connect = require("./connections/mongo");
const UserRouter = require("./routes/user");
const DocsRouter = require("./routes/docs");
const ErrorHandler = require("./helpers/middlewares/error-handler");

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
app.use(UserRouter);
app.use(DocsRouter);
app.use(ErrorHandler);

app.listen(3000, () => {
  console.log("user-service listen on port 3000");
});
