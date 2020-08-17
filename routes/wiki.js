const express = require("express");
const router = express.Router();
const { addPage, wikiPage, main } = require("../views");
const { Page } = require("../models");

// GET /wiki:id
router.get("/", async (req, res, next) => {
  const pages = await Page.findAll({
    attributes: ["slug"],
  });
  res.send(main(pages));
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
    res.redirect(`/wiki/${page.slug}`);
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

// GET /wiki/:slug

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug },
    });

    if (page === null) {
      throw new Error("Page doesn't exist");
    }

    res.send(wikiPage(page.dataValues));
  } catch (e) {
    next(e);

    //Error handling page
    res.redirect("/");
  }
});

module.exports = router;
