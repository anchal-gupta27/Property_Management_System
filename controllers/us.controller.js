const User = require("../models/us.model.js");

// Create and Save a new Cser
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    const user = new User({
        user_id: req.body.user_id, 
        password: req.body.password

      });
    
      // Save Cser in the database
      User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Cser."
          });
        else res.send(data);
      });
};
exports.login = (req, res) => {
  console.log("Entered here")
  if(!req.body) {
    console.log("Bad request : ", req.body)
    res.status(400).send({
      message: "Empty"
    })
  }
    const loginDetails = new User({
      user_id: req.body.user_id,
      password: req.body.password
    })
    User.login(loginDetails, (err, data)=> {
        if(err)
          res.status(500).send({
            message: "Internal Server Error"
          });
          else res.status(200).send({password: data})
    })
  }
// Retrieve all Csers from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving csers."
          });
        else res.send(data);
      });
};

// Find a single Cser with a cserId
exports.findOne = (req, res) => {
    User.findById(req.params.user_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.user_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.user_id
            });
          }
        } else res.send(data);
      });
};

// Update a Cser identified by the cserId in the request


// Delete a Cser with the specified cserId in the request
exports.delete = (req, res) => {
    User.remove(req.params.user_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.user_id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with id " + req.params.user_id
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
      });
};

// Delete all Csers from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        else res.send({ message: `All users were deleted successfully!` });
      });
  
};