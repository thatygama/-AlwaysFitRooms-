const express = require("express");
const RoomController = require("../controllers/RoomController");

const router = express.Router();

router.get("/rooms", RoomController.getAllRooms);
/* router.get("/rooms/:id", RoomController.getRoomById);
router.post("/rooms", RoomController.createRoom);
router.put("/rooms/:id", RoomController.updateRoom);
router.delete("/rooms/:id", RoomController.deleteRoom); */

module.exports = router;
