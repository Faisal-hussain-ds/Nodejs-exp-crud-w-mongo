const conversationModel = require("../../model/conversation");
const messageModel = require("../../model/message");
const http = require("axios");

exports.create = async (req, res) => {
  // if request is empty
  if (!req.body.id) {
    return res.status(400).send({
      message: "User Id is required",
    });
  }

  var conversationExist = null;

  // Find a record by ID
  await conversationModel
    .findById("6411ac9cd3bed18503a9e9d6")
    .exec((err, record) => {
      if (err) {
        // Handle error
        // console.error(err);
      }

      conversationExist = record;
      // Record found
      console.log(record, "This is get record");
    });

  const newModelObject = new conversationModel({
    user_id: req.body.id,
  });

  const { API_KEY } = process.env;
  const reqData = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: req.body.query ? req.body.query : "Hello." },
    ],
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  await http
    .post("https://api.openai.com/v1/chat/completions", reqData, {
      headers: headers,
    })
    .then((response) => {
      if (
        conversationExist &&
        conversationExist._id == "6411ac9cd3bed18503a9e9d6"
      ) {

        console.log('conversation is exit',conversationExist.message_count)
        const messageModelObject = new messageModel({
          user_id: req.body.id,
          conversation_id: conversationExist._id,
          query_text: req.body.query ? req.body.query : "Hello!",
          ans: JSON.parse(JSON.stringify(response.data)),
        });

        messageModelObject.save();


        res.send(messageModelObject);
      } else {
        console.log("I am being call at else condition");
        newModelObject
          .save()
          .then((data) => {
            const messageModelObject = new messageModel({
              user_id: req.body.id,
              conversation_id: data._id,
              query_text: req.body.query ? req.body.query : "Hello!",
              ans: JSON.parse(JSON.stringify(response.data)),
            });
            messageModelObject.save();
            res.send(messageModelObject);
          })
          .catch((e) => {
            res.status(500).send({
              message:
                e.message || "Some error occurred while creating the New User.",
            });
          });
      }
    });

  // save new object into database
};

// get all user records
exports.findAll = async (req, res) => {
  try {
    if(!req.params.user_id) throw new Error("Id is required")
    const data = await conversationModel.find({user_id:req.params.user_id})
    res.send(data)
    // .then((data) => {
    //   res.send(data);

    // })
    // .catch((error) => {
    //   res.status(500).send({
    //     message: error.message || "Some Thing went wrong",
    //     detail: error,
    //   });
    // });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error.message || "Some Thing went wrong",
      detail: error,
    });
  }
  
};

// get only one user

exports.findOne = async (req, res) => {
  console.log(req.params.conv_id, "this is req");
  conversationModel
    .findById(req.params.conv_id)
    .exec((err, conversation) => {
      if (err) {
        // Handle error
        console.error(err);
        return res.status(500).send({
          message: err.message || "Something went wrong",
        });
      }

      // Conversation found and its messages populated
      console.log(conversation, "This is conversation with messages");
      res.send(conversation);
    });
};

// update user

exports.update = async (req, res) => {
  userModel
    .findByIdAndUpdate(
      req.params.userId,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
      },
      { new: true }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Something went wrong",
      });
    });
};

// delete user by id

exports.delete = async (req, res) => {
  userModel
    .findByIdAndRemove(req.params.userId)
    .then((data) => {
      if (!data) {
        res.status(404).send("User Not Found on id " + req.params.userId);
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Something went wrong",
      });
    });
};



exports.findConversationMessages = async (req, res) => {
  console.log(req.params.conv_id, "this is req");
  messageModel
    .find({"conversation_id":req.params.conv_id})
    .exec((err, messages) => {
      if (err) {
        // Handle error
        console.error(err);
        return res.status(500).send({
          message: err.message || "Something went wrong",
        });
      }

      // Conversation found and its messages populated
      console.log(messages, "This is conversation with messages");
      res.send(messages);
    });
};

exports.allConversations = async (req, res) => {
  console.log(req.user_id, "this is req");
  conversationModel
    .find()
    .then((err, messages) => {
      if (err) {
        // Handle error
        console.error(err);
        return res.status(500).send({
          message: err.message || "Something went wrong",
        });
      }

      // Conversation found and its messages populated
      console.log(messages, "This is conversation with messages");
      res.send(messages);
    });
};
