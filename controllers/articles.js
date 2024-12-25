const Article = require("../models/article");

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send(articles))
    .catch(next);
};

module.exports = {
  getArticles,
};
