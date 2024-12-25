const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { createUser, getCurrentUser } = require("../controllers/users");

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      username: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser
);

router.get("/me", getCurrentUser);

module.exports = router;
