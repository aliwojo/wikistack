const express = require("express");
const morgan = require("morgan");
const html = require("html-template-tag");
const views = require("./views");
const { db } = require('./models/index');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

// db.authenticate()
//   .then(() => {
//     console.log('connected to the database');
//   })
  
app.get("/", (req, res) => {
  res.send(views.main(""));
});

const start = async () => {
  await db.sync({force: true});
  const PORT = 3000;
  app.listen(PORT, () => console.log("listening to port 3000"));
};

start();
