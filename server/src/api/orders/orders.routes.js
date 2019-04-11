const router = require("express").Router();
const permit = require("../../middleware/permission");
const entity = "orders";
const controller = require(`./${entity}.controller`);
const Role = require("../../enums/roles.enum");
const validation = require("../../middleware/validation");
const schema = require("../../validation").order;

router.get(
  "/",
  permit([Role.Executor, Role.Customer]),
  validation(schema.orderQUERY, "query"),
  controller.get
);
router.get("/:id", permit([Role.Executor, Role.Customer]), controller.getById);
router.post(
  "/",
  permit(Role.Customer),
  validation(schema.orderPOST, "body"),
  controller.post
);
router.put(
  "/:id",
  permit(Role.Executor),
  validation(schema.orderPUT, "body"),
  controller.put
);
router.delete("/:id", permit(Role.Customer), controller._delete);

module.exports = router;
