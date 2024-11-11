require("dotenv").config();

let mongoose = require("mongoose");

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookSchema = new mongoose.Schema({
  title: String,
  commentcount: Number,
  comments: Array,
});

module.exports = mongoose.model("bookSchema", bookSchema);
