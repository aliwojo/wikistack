const express = require("express");
const morgan = require("morgan");
const html = require("html-template-tag");
const views = require("./views");
const { db } = require("./models/index");
const wikiRouter = require("./routes/wiki");
const usersRouter = require("./routes/users");
const { get } = require("./routes/wiki");
const Sequelize = require("sequelize");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

// db.authenticate()
//   .then(() => {
//     console.log('connected to the database');
//   })

app.use("/wiki", wikiRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

const start = async () => {
  await db.sync({ force: true });
  const PORT = 3000;
  app.listen(PORT, () => console.log("listening to port 3000"));
};

start();
