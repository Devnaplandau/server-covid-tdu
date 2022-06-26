const { Place, UserPlace } = require("../models");

exports.create = async (req, res) => {
  try {
    const newPlace = new Place({
      ...req.body,
      //  creator: req.body.id,
    });
    const savePlace = await newPlace.save();
    res.status(201).json(savePlace);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.getAll = async (req, res) => {
  try {
    const list = await Place.find({}).sort("-createAt");
    for (const place of list) {
      const userVisitLast24h = await UserPlace.find({
        place: place._id,
        createAt: {
          $gt: new Date(Date.now() - 26 * 60 * 60 * 1000),
        },
      }).populate("user");
      place._doc.userVisitLast24h = userVisitLast24h;
    }
    res.status(201).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    const userVisitLast24h = await UserPlace.find({
      place: place._id,
      createAt: {
        $gt: new Date(Date.now() - 26 * 60 * 60 * 1000),
      },
    }).populate("user");
    place._doc.userVisitLast24h = userVisitLast24h;
    res.status(200).json(place);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.update = async (req, res) => {
  try {
    const place = await Place.findOneAndUpdate({
      //   _id: req.params.id,
      //   creator: req.user._id,
      // },
      // {
      //   $set: req.body,
      // }
      name: req.body.name,
      address: req.body.address,
    });
    res.status(200).json(place);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.delete = async (req, res) => {
  try {
    await UserPlace.deleteMany({ place: req.params.id });
    await Place.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json("Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
