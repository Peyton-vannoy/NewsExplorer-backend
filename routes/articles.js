const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const auth = require("../middlewares/auth");
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");

// Protect all routes
router.use(auth);

router.get("/", getArticles);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().uri(),
      image: Joi.string().required().uri(),
    }),
  }),
  createArticle
);

router.delete(
  "/:articleId",
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteArticle
);

module.exports = router;
