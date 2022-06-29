const { User, Feedback } = require("../models");

exports.create = async (req, res) => {
  try {
    const newFeedBack = new Feedback({
      ...req.body,
      //  creator: req.body.id,
    });
    const saveFeedBack = await newFeedBack.save();
    res.status(201).json(saveFeedBack);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await Feedback.find({}).populate("user");
    res.status(201).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    await Feedback.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json("Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
