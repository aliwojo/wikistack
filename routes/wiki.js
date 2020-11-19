const express = require("express");
const router = express.Router();
const views = require("../views");
const { Page } = require("../models");

router.get("/", (req, res) => {
  res.send(views.wikiPage("", ""));
});

router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // const status = req.body.status;
  const getSlug = (title) => {
    return title.replace(/\s+/g, "_").replace(/\W/g, "");
  };
  try {
    // const slug = await Page.beforeValidate(req.body, getSlug(req.body.title));
    const page = await Page.create({
      title: title,
      content: content,
      slug: slug,
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
