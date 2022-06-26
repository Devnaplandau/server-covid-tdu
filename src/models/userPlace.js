const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");

const userPlaceSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    place: {
      type: Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
  },
  schemaOptions
);
module.exports = mongoose.model("UserPlace", userPlaceSchema);
