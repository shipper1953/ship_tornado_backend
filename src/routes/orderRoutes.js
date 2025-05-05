const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const shipmentController = require("../controllers/shipmentController");

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.post("/:id/shipments", shipmentController.createShipmentForOrder);

module.exports = router;
