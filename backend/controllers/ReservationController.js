const Reservation = require("../models/reservation.js");

const ReservationController = {
    getAllReservations: async (req, res) => {
        try {
            const reservations = await Reservation.find();
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = ReservationController;
