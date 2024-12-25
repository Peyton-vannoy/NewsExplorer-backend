const Article = require("../models/article");

// Get all articles for the current user
const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id })
      .populate("owner", ["username", "email"])
      .orFail(new Error("No articles found"));

    res.json({ data: articles });
  } catch (err) {
    if (err.message === "No articles found") {
      return res.status(404).json({ message: "No articles found" });
    }
    next(err);
  }
};

// Creat a new article
const createArticle = async (req, res, next) => {
  try {
    const { keyword, title, text, date, source, link, image } = req.body;
    const article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.body._id,
    });
    res.status(201).json({ message: "Article created successfully", article });
  } catch (err) {
    next(err);
  }
};

// Delete an article
const deleteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.owner.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this article" });
    }

    await Article.findByIdAndDelete(articleId);
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
