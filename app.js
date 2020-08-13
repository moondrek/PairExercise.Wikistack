const express = require("express");
const morgan = require("morgan");
const app = express();
const layout = require("./views/layout");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send(layout());
});

app.listen(
  3000,
  console.log("listening on port 3000 at http://127.0.0.1:3000/")
);
