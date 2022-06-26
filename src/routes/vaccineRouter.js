const router = require("express").Router();
const { vaccineController, vaccineLotController } = require("../controllers");
const tokenHandler = require("../handlers/tokenHandler");

router.post("/", vaccineController.create);
router.get("/", vaccineController.getAll);
router.get("/:id", vaccineController.getOne);
router.put("/:id", vaccineController.update);
router.delete("/:id", vaccineController.delete);

// vaccine lot

router.post(
  "/lots",

  vaccineLotController.create
);
// trường hợp này do bị trùng đường dẫn nên hơi dài
router.get(
  "/lots/get-all",

  vaccineLotController.getAll
);
router.get(
  "/lots/:id",

  vaccineLotController.getOne
);
router.put(
  "/lots/:id",

  vaccineLotController.update
);
router.delete(
  "/lots/:id",

  vaccineLotController.delete
);

module.exports = router;
