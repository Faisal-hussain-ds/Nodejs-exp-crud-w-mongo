const userModel = require("../../model/user");
var bcrypt = require("bcrypt");
const user = require("../../model/user");

exports.create = async (req, res) => {
  // if request is empty
  if (!req.body.password) {
    return res.status(400).send({
      message: "Request can not be empty",
    });
  }

  // create a model object
  var encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const modelObject = new userModel({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: encryptedPassword,
  });

  // save new object into database

  modelObject
    .save()
    .then((data) => {
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
