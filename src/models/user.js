const mongoose = require("mongoose");
// const { stringify } = require("nodemon/lib/utils");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");
const userSchema = new mongoose.Schema(
  {
    idNumber: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    alert: {
      type: Boolean,
    },
    dateCheck: {
      type: String,
    },
  },
  schemaOptions
);
module.exports = mongoose.model("User", userSchema);
