const { Partner } = require("../models");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  try {
    const partner = await Partner.findOne({
      fullName: req.body.username,
    });
    if (!partner) return res.status(401).json("Wrong username");
    if (partner.password !== req.body.password)
      return res.status(401).json("Wrong password");
    const token = jwt.sign(
      {
        id: partner.id,
      },
      process.env.TOKEN_SECRET_KEY
    );
    res.status(200).json({
      partner,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    const partner = await Partner.findOne({
      fullName: req.body.fullName,
    });
    if (partner) return res.status(401).json("Wrong username");
    const newPartner = new Partner({
      ...req.body,
    });
    const savePartner = await newPartner.save();
    res.status(201).json(savePartner);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const list = await Partner.find({}).sort("-createAt");
    res.status(201).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const place = await Partner.findById(req.params.id);
    res.status(200).json(place);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    const updatePartner = await Partner.findByIdAndUpdate(req.params.id, {
      // giá trị đc nhập vào sẽ dùng lại update vào id đc set
      $set: req.body,
    });
    res.status(200).json(updatePartner);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    await Partner.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json("Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
