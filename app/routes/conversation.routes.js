const express = require("express"),
  router = express.Router();

const conversationController = require("../controllers/conversationController.js");

// Create a new user
router.post("/conv-chat", conversationController.create);

// Retrieve all users
router.get("/", conversationController.findAll);

// Retrieve a single user with userId
router.get("/conv/:userId", conversationController.findOne);

// Update a user with userId
router.put("/conv/:userId", conversationController.update);

// Delete a user with userId
router.delete("/conv/:userId", conversationController.delete);
module.exports = router;
