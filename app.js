const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errorHandler } = require("./middlewares/error-handler");

const { MONGODB_URI = "mongodb://127.0.0.1:27017/newsexplorerbackend" } =
  process.env;
const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(helmet());
app.use(cors());
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
