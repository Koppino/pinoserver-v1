const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");
const app = express();
const path = require("path");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const chatController = require("./controllers/ChatController");
const { request } = require("http");
require("./config/passport")(passport);
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
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));

app.use(cookieParser("keyboard cat"));

app.use("/", require("./routes/index"));
app.use("/chat", require("./routes/chat"));
app.use("/person", require("./routes/person"));
app.use("/acc", require("./routes/acc"));
app.use("/posts", require("./routes/posts"));
app.use("/api/ios/", require("./routes/apios"));





io.on("connection", (socket) => {
  console.log(socket.handshake.headers.cookie);
  socket.on("chat message", (msg) => {
    console.log(msg);

    io.emit("chat message",msg);
  });
});

http.listen("1337", () => {
  console.log("server is running.");
});
