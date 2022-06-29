const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");

const feedBackSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    namePlace: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  schemaOptions
);
module.exports = mongoose.model("FeedBack", feedBackSchema);
