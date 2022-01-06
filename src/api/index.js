const router = require("express").Router();

router.use("/users", require("./user"));
router.use("/players", require("./player"));
router.use("/ratings", require("./rating"));
router.use("/tastings", require("./tasting"));
router.use("/tastingitems", require("./tastingItem"));
router.use("/image", require("./image"));
router.use("/heldTastings", require("./heldTasting"));
router.use("/heldTastingRatings", require("./heldTastingRating"));
router.use("/playerRatings", require("./playerRating"));

module.exports = router;
