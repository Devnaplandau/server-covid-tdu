const express = require("express");
const router = express.Router();
const tokenHandler = require("../handlers/tokenHandler");
const { userController } = require("../controllers");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

// create user
router.post("/", tokenHandler.verify, userController.create);
// check all user
router.get("/", userController.getAll);

router.get("/:id", userController.getOne);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);
router.get("/phone/:phone", userController.getOnePhone);
router.delete("/:id", userController.delPlaceUser);
// add vaccinated to user
router.post(
  "/vaccinated",

  userController.vaccinated
);
router.get("/:userId/place", userController.getAllPlace);

router.post("/checkin-place", userController.checkinPlace);
// place that user visited
router.get(
  "/:userId/place-visited",
  // tokenHandler.verifyToken,
  userController.placeVisited
);
router.get(
  "/ok/getallplaceanduser",
  // tokenHandler.verifyToken,
  userController.getAllPlaceUser
);

module.exports = router;
