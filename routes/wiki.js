const express = require("express");
const router = express.Router();
const views = require("../views");
const { Page } = require("../models");
const Sequelize = require("sequelize");

router.get("/", (req, res) => {
  res.send(views.wikiPage("", ""));
});

router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  try {
    const getSlug = (title) => {
      return title.replace(/\s+/g, "_").replace(/\W/g, "");
    };

    Page.beforeValidate(function (page, options) {
      page.slug = getSlug(title);
    });

    const page = await Page.create({
      title: title,
      content: content,
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

router.get("/add", (req, res) => {
  res.send(views.addPage());
});

module.exports = router;
