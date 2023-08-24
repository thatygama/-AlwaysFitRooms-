const Room = require("../models/room.js");

const RoomController = {
    getAllRooms: async (req, res) => {
        try {
            const rooms = await Room.find();
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = RoomController;
