const express = require("express");
const morgan = require("morgan");
const app = express();
const layout = require("./views/layout");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");

//
const { db, Page, User } = require("./models");

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.use("/wiki", wikiRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

const init = async () => {
  await db.sync({ force: true });
  // await Page.sync();
  // await User.sync();

  app.listen(
    3000,
    console.log("listening on port 3000 at http://127.0.0.1:3000/")
  );
};

//invoke init
init();
