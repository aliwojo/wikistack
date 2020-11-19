const express = require("express");
const morgan = require("morgan");
const html = require("html-template-tag");
const views = require("./views");
const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(views.main(""));
});

const PORT = 3000;
app.listen(PORT, () => console.log("listening to port 3000"));
