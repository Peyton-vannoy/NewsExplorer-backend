const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const routes = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errors } = require("celebrate");
const { errorHandler } = require("./middlewares/error-handler");

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/newsexplorerdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(helmet());

app.use(requestLogger);

// Routes
app.use("/", routes);

// Error logger
app.use(errorLogger);

// Error handler
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
