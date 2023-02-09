const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("./config/passport-local-strategy");
// mongoStore is used to store the session cookie in the db
let MongoStore = require("connect-mongo");
app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.static("./assets"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codial",
    secret: "blah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/codial_developement",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connected to mongodb setup");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
