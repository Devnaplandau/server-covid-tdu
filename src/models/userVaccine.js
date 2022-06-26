const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./modelOptions");
const userVaccineSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vaccine: {
      type: Schema.Types.ObjectId,
      ref: "Vaccine",
      required: true,
    },
    vaccineLot: {
      type: Schema.Types.ObjectId,
      ref: "VaccineLot",
      required: true,
    },
  },
  schemaOptions
);
module.exports = mongoose.model("UserVaccine", userVaccineSchema);
