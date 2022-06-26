const mongoose = require("mongoose");
// const { stringify } = require("nodemon/lib/utils");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");
const partnerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    permissionUser: {
      type: Boolean,
    },
    permissionPlace: {
      type: Boolean,
    },
    permissionInfoVaccine: {
      type: Boolean,
    },
    permissionDeclaration: {
      type: Boolean,
    },
    permissionScan: {
      type: Boolean,
    },
  },
  schemaOptions
);
module.exports = mongoose.model("Partner", partnerSchema);
