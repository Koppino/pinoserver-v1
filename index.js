const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
// Passport Config
require("./config/passport")(passport);
const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");
const app = express();
const path = require("path");
const flash = require("connect-flash");

db = mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
app.use(expressLayouts);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(flash());


app.use(
  session({ secret: "secret", resave: false, saveUninitialized: false })
);

app.use(passport.initialize());
app.use(passport.session());

var myLogger = function (req, res, next) {
  console.log(
    new Date().toLocaleString("cs-EN").replace(" ", "").replace(" ", "")
  );
  console.log(req.session);
  next();
};

app.use(myLogger);
app.use('/', require("./routes/index.js"));
app.use('/people', require('./routes/people.js'));
app.use('/acc', require('./routes/acc.js'))
app.listen(1380, () => {
  console.log("server is running.");
});
