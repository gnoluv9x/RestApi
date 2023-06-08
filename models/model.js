const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  createdAt: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("posts", postSchema);
