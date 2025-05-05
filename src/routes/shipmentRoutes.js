// shipmentRoutes.js
const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/shipments/:order_id
router.post('/:id', authMiddleware, shipmentController.createShipmentForOrder);

module.exports = router;