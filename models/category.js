const { Schema, model } = require("mongoose");

const category = new Schema(
  {
    category_name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    meta_tag_title: {
      type: String,
      required: true
    },
    meta_tag_description: {
      type: String,
    },
    meta_tag_keywords: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("category", category);
