const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/user/users", UserController.getAllUsers);
router.get("/user/:id", UserController.getUserById);
router.post("/user/new-user", UserController.createUser);
router.post("/user/login", UserController.loginUser);
/* router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser); */

module.exports = router;
