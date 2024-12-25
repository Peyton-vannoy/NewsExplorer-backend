const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     return /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/.test(v);
    //   },
    //   message: "Invalid URL",
    // },
  },
  image: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     return /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/.test(v);
    //   },
    //   message: "Invalid URL",
    // },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Article", articleSchema);
