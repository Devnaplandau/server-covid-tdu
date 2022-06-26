const jwt = require("jsonwebtoken");
const {
  User,
  UserVaccine,
  UserPlace,
  VaccineLot,
  Vaccine,
  Place,
} = require("../models");
const vaccine = require("../models/vaccine");
// check create account (phone & id)
exports.create = async (req, res, next) => {
  // const { phoneNumber, idNumber } = req.body;
  try {
    // kiểm tra phone đã đăng ký chưa
    // let user = await User.findOne({ phoneNumber: phoneNumber });
    // if (user)
    //   return res
    //     .status(403)
    //     .json("phone number already registered for another account");

    // user = await User.findOne({ idNumber: idNumber });
    // if (user)
    //   return res
    //     .status(403)
    //     .json("Id number already registered for another account");

    const newUser = new User(req.body);
    const saveUser = await newUser.save();
    const token = jwt.sign(
      {
        id: saveUser._id,
      },
      process.env.TOKEN_SECRET_KEY
    );

    res.status(201).json({
      user: saveUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// get all user
exports.getAll = async (req, res) => {
  try {
    const list = await User.find({}).sort("-createAt");
    for (const user of list) {
      const vaccine = await UserVaccine.find({
        user: user._id,
      }).sort("-createAt");
      user._doc.vaccine = vaccine;
    }
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.getAllPlaceUser = async (req, res) => {
  try {
    const list = await UserPlace.find({}).populate("place");
    for (const user of list) {
      const userS = await User.find({
        _id: user.user,
      });
      user._doc.userS = userS;
    }
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// get a user
exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userVaccine = await UserVaccine.find({
      user: req.params.id,
    })
      .populate("vaccine")
      .populate("vaccineLot")
      .sort("-createAt");

    const userPlaceVisit = await UserPlace.find({
      user: req.params.id,
    })
      .populate("place")
      .sort("-createAt");

    user._doc.vaccinated = userVaccine;
    user._doc.placeVisited = userPlaceVisit;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// get one phone
exports.getOnePhone = async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.params.phone });
    const userVaccine = await UserVaccine.find({
      user: req.params.id,
    })
      .populate("vaccine")
      .populate("vaccineLot")
      .sort("-createAt");

    const userPlaceVisit = await UserPlace.find({
      user: req.params.id,
    })
      .populate("place")
      .sort("-createAt");

    user._doc.vaccinated = userVaccine;
    user._doc.placeVisited = userPlaceVisit;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  // const { phoneNumber, idNumber } = req.body;
  try {
    // kiểm tra phone đã đăng ký chưa
    // let user = await User.findOne({ phoneNumber: phoneNumber });
    // if (user && user._id.toString() !== req.params.id)
    //   return res
    //     .status(403)
    //     .json("phone number already registered for another account");

    // user = await User.findOne({ idNumber: idNumber });
    // if (user && user._id.toString() !== req.params.id)
    //   return res
    //     .status(403)
    //     .json("Id number already registered for another account");

    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      // giá trị đc nhập vào sẽ dùng lại update vào id đc set
      $set: req.body,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await UserVaccine.deleteMany({ user: id });
    await UserPlace.deleteMany({ user: id });
    await User.findByIdAndDelete(id);
    await VaccineLot.findByIdAndDelete({ _id: id });
    res.status(200).json("Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// add vaccinated to user
exports.vaccinated = async (req, res) => {
  try {
    const { userId, vaccineId, vaccineLotId } = req.body;
    const newVaccine = new UserVaccine({
      user: userId,
      vaccine: vaccineId,
      vaccineLot: vaccineLotId,
    });
    const saveUserVaccine = await newVaccine.save();
    await VaccineLot.findOneAndUpdate(
      {
        _id: vaccineLotId,
      },
      {
        $inc: { vaccinated: +1 },
      }
    );
    saveUserVaccine._doc.vaccine = await Vaccine.findById(vaccineId);
    saveUserVaccine._doc.vaccineLot = await VaccineLot.findById(vaccineLotId);
    res.status(201).json(saveUserVaccine);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// get places of user
exports.getAllPlace = async (req, res) => {
  try {
    const list = await Place.find({
      creator: req.params.userId,
    });
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// add user check in place
exports.checkinPlace = async (req, res) => {
  try {
    const newVisit = new UserPlace({
      user: req.body.id,
      place: req.body.placeId,
    });
    const savedUserPlace = await newVisit.save();
    res.status(200).json(savedUserPlace);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// get place that user checked in
exports.placeVisited = async (req, res) => {
  try {
    const list = await UserPlace.find({
      // user: req.params.userId,
    }).populate("user");
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
