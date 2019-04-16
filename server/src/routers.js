const router = require("express").Router();
const { version } = require("../package.json");

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Parcel Pending API",
    data: { version_number: `v${version}` }
  });
});

router.use("/auth", require("./api/auth").router);
router.use("/auth/confirm", require("./api/auth/confirm").router);
router.use("/orders", require("./api/orders").router);
router.use("/users", require("./api/users").router);
router.use("/companies", require("./api/companies").router);
router.use("/reviews", require("./api/reviews").router);
module.exports = router;
