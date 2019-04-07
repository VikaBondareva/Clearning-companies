const router = require("express").Router();
const controller = require(`./reviews.controller`);
const permit = require("../../middleware/permission");
const Role = require("../../enums/roles.enum");
const validation = require("../../middleware/validation");
const schemas = require("../../validation").review;

router.get("/", permit([Role.Customer, Role.Executor]), controller.get);
// router.get("/:id", permit([Role.Customer, Role.Executor]), controller.getById);
router.get("/:id", controller.getReviewsCompany);
router.delete(
  "/:id",
  permit([Role.Executor, Role.Customer]),
  controller._delete
);
router.put(
  "/:id",
  permit(Role.Customer),
  validation(schemas.reviewPOST, "body"),
  controller.put
);
router.post(
  "/",
  permit(Role.Customer),
  validation(schemas.reviewPOST, "body"),
  controller.post
);

module.exports = router;
