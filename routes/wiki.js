const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");

// GET /wiki:id
router.get("/", async (req, res, next) => {
  res.send("hello world wiki get");
});

function slugify(title) {
  let slug = title.replace(/\s+/g, "_").replace(/\W+/g, "");
  //return a slugged title
  return slug;
}

// POST /wiki
router.post("/", async (req, res, next) => {
  console.log(req.body);

  try {
    Page.beforeValidate((page, options, fn) => {
      page.slug = slugify(page.title);
    });

    const page = await Page.create({
      title: req.body.title,
      content: req.body.pageContent,
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

// GET /wiki/add
router.get("/add", async (req, res, next) => {
  try {
    const html = addPage();
    res.send(html);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
