const express = require("express");
const router = express.Router();
const tokenHandler = require("../handlers/tokenHandler");
const { placeController } = require("../controllers");

// place created by user
router.post("/", placeController.create);
router.get("/", placeController.getAll);
router.get("/:id", placeController.getOne);
router.put("/:id", placeController.update);
router.delete("/:id", tokenHandler.verify, placeController.delete);

module.exports = router;
