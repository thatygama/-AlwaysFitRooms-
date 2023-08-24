const express = require("express");
const ReservationController = require("../controllers/ReservationController");

const router = express.Router();

router.get("/reservations", ReservationController.getAllReservations);
/* router.get("/reservations/:id", ReservationController.getReservationById);
router.post("/reservations", ReservationController.createReservation);
router.put("/reservations/:id", ReservationController.updateReservation);
router.delete("/reservations/:id", ReservationController.deleteReservation); */

module.exports = router;
