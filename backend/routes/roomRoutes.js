const express = require("express");
const RoomController = require("../controllers/RoomController");

const router = express.Router();

router.get("/room/rooms", RoomController.getAllRooms);
router.get("/room/:id", RoomController.getRoomById);
/* router.post("/room/rooms", RoomController.createRoom);
router.put("/room/rooms/:id", RoomController.updateRoom);
router.delete("/room/rooms/:id", RoomController.deleteRoom); */

module.exports = router;
