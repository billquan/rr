const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    category: {
      type: String, // data type
      required: true, // not-null
      unique: true, // unique
      trim: true, // removes space around entry
    },
    description: { type: String, required: true },
    imgUrl: { type: String, required: false },
    courses: { type: Array, required: false },
  },
  {
    timestamps: true, // automatically creates fields for creation and modification time
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
