const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const roomRoutes = require("./roomRoutes");
const reservationRoutes = require("./reservationRoutes");

router.use(userRoutes);
router.use(roomRoutes);
router.use(reservationRoutes);

module.exports = router;