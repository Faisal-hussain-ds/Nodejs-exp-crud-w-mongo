const conversationModel = require("../../model/conversation");
const messageModel = require("../../model/message");



exports.create = async (req, res) => {
  // if request is empty
  if (!req.body.id) {
    return res.status(400).send({
      message: "User Id is required",
    });
  }

  // create a model object

  const modelObject = new conversationModel({
    user_id: req.body.id,
  });
  

  // save new object into database

  modelObject
    .save()
    .then((data) => {
    

      const messageModelObject = new messageModel({
        user_id: req.body.id,
        conversation_id: data._id,
        query_text:'what is Laravel ?',
        ans:"Its a Framework"
      });
      messageModelObject.save();
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message:
          e.message || "Some error occurred while creating the New User.",
      });
    });
};

// get all user records
exports.findAll = async (req, res) => {
  userModel
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some Thing went wrong",
        detail: error,
      });
    });
};

// get only one user

exports.findOne = async (req, res) => {
  userModel
    .findById(req.params.userId)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Something went wrong",
      });
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
