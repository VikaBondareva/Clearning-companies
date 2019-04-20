const router = require("express").Router({ mergeParams: true });
const controller = require(`./reviews.controller`);
const permit = require("../../middleware/permission");
const Role = require("../../enums/roles.enum");
const validation = require("../../middleware/validation");
const schemas = require("../../validation").review;

router.get("/", controller.getReviewsCompany);
router.delete("/:idReview", permit([Role.Customer]), controller._delete);
router.post(
  "/",
  permit(Role.Customer),
  validation(schemas.reviewPOST, "body"),
  controller.post
);

module.exports = router;
