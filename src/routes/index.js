const express = require("express");
const router = express.Router();

router.use("/admin", require("./adminRouter"));
router.use("/user", require("./usersRouter"));
router.use("/place", require("./placeRouter"));
router.use("/vaccine", require("./vaccineRouter"));
router.use("/partner", require("./partnerRouter"));
router.use("/feedback", require("./feedBackRouter"));

module.exports = router;
