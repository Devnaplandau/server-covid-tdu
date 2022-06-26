const { Vaccine, VaccineLot, UserVaccine } = require("../models");

exports.create = async (req, res) => {
  try {
    const newVaccineLot = new VaccineLot({
      name: req.body.name,
      quantity: req.body.quantity,
      vaccinated: 0,
      vaccine: req.body.vaccineId,
    });
    const saveLot = await newVaccineLot.save();
    res.status(201).json(saveLot);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.getAll = async (req, res) => {
  try {
    const list = await VaccineLot.find({})
      .populate("vaccine")
      .sort("-createAt");
    res.status(201).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.getOne = async (req, res) => {
  try {
    const vacccineLot = await VaccineLot.findById(req.params.id).populate(
      "vaccine"
    );
    res.status(201).json(vacccineLot);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.update = async (req, res) => {
  try {
    const vaccineLot = await VaccineLot.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(201).json(vaccineLot);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.delete = async (req, res) => {
  try {
    await UserVaccine.deleteMany({ vaccineLot: req.params.id });
    await VaccineLot.findByIdAndDelete(req.params.id);
    res.status(201).json("Delete");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
