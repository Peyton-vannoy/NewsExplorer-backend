const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { createUser, getCurrentUser, signIn } = require("../controllers/users");
const auth = require("../middlewares/auth");

// Public routes
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

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signIn
);

// Protected routes
router.get("/me", auth, getCurrentUser);

module.exports = router;
