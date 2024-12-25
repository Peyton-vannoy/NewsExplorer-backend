const router = require("express").Router();
const articlesRouter = require("./articles");
const usersRouter = require("./users");

router.use("/articles", articlesRouter);
router.use("/users", usersRouter);

module.exports = router;
