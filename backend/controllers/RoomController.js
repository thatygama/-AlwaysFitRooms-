const { Room } = require("../models");

const RoomController = {
    getAllRooms: async (req, res) => {
        try {
            const rooms = await Room.findAll();
            res.json(rooms);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getRoomById: async (req, res) => {
        const roomId = req.params.id;
    
        try {
            const room = await Room.findByPk(roomId);
    
            if (!room) {
            return res.status(404).json({ message: 'Room not found!' });
            }
    
            return res.status(200).json(room);
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error' });
        }
    }
};

module.exports = RoomController;
