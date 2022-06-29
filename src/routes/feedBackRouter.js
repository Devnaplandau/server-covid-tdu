const express = require("express");
const router = express.Router();

const { feedbackController } = require("../controllers");

router.post("/", feedbackController.create);
router.get("/", feedbackController.getAll);
router.delete("/:id", feedbackController.delete);

module.exports = router;
