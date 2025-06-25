const express = require("express");
const {
  registerUser,
  logInUser,
  getUserById,
  getUsers,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/find/:userId", getUserById);
router.get("/", getUsers);

module.exports = router;
