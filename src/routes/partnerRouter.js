const express = require("express");
const router = express.Router();
const tokenHandler = require("../handlers/tokenHandler");
const { partnerController } = require("../controllers");

router.post("/login", partnerController.login);
router.post("/", partnerController.create);
router.get("/", partnerController.getAll);
router.get("/:id", partnerController.getOne);
router.put("/:id", partnerController.update);
router.delete("/:id", partnerController.delete);
router.post("/check-token", tokenHandler.verifyPartner, (req, res) => {
  res.status(200).json("Authorized");
});
module.exports = router;
