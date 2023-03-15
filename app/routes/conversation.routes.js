const express = require("express"),
  router = express.Router();

const conversationController = require("../controllers/conversationController.js");

// Create a new user
router.post("/conv-chat", conversationController.create);

// Retrieve all users
router.get("/conv/all/:user_id", conversationController.findAll);

// Retrieve a single user with userId
router.get("/conv/:conv_id", conversationController.findOne);

// get all conversations
// router.get("/conv/get", conversationController.allConversations);

// get messages of a conversation
router.get("/conv/messages/:conv_id", conversationController.findConversationMessages);

// Update a user with userId
router.put("/conv/:userId", conversationController.update);

// Delete a user with userId
router.delete("/conv/:userId", conversationController.delete);
module.exports = router;
