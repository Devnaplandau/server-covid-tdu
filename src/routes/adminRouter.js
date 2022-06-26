const router = require("express").Router();
const { adminController } = require("../controllers");
const tokenHandler = require("../handlers/tokenHandler");
// router.get("/", adminController.helloAdmin);
router.post("/login", adminController.login);

router.get("/summary", adminController.summary);

router.post("/check-token", tokenHandler.verifyAdminToken, (req, res) => {
  res.status(200).json("Authorized");
});
module.exports = router;
