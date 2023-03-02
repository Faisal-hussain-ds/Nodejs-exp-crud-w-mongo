const express = require("express"),
  router = express.Router();

const userController = require("../controllers/userController.js");
const userModel = require("../../model/user");

// Create a new user
router.post("/user", userController.create);

// Retrieve all users
router.get("/user", userController.findAll);

// Retrieve a single user with userId
router.get("/user/:userId", userController.findOne);

// Update a user with userId
router.put("/user/:userId", userController.update);

// Delete a user with userId
router.delete("/user/:userId", userController.delete);
module.exports = router;
