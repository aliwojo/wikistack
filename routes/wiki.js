const express = require("express");
const router = express.Router();
const views = require("../views");
const { Page } = require("../models");

router.get("/", async (req, res) => {
  const pages = await Page.findAll();
  res.send(views.main(pages));
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

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

router.get("/add", (req, res) => {
  res.send(views.addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    console.log(req.params.slug);
    const page = await Page.findAll({ where: { slug: req.params.slug } });
    console.log(page);
    res.send(views.wikiPage(page[0].dataValues, "author"));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
