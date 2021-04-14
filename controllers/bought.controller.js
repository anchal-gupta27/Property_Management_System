const Bought = require("../models/bought.model.js");

// Create and Save a new Cser
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    } 
    const bought = new Bought({ 
       property_id: req.body.property_id,
       property_type: req.body.property_type,
       property_name: req.body.property_name,
       property_desc: req.body.property_desc,
       user_id: req.body.user_id

      });
    
      // Save Cser in the database
      Bought.create(bought, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the property."
          });
        else res.send(data);
      });
};

// Retrieve all Csers from the database.
exports.findAll = (req, res) => {
    Bought.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving property."
          });
        else res.send(data);
      });
};

// Find a single Cser with a cserId
exports.findOne = (req, res) => {
  console.log("User Id : ", req.params.user_id)
    Bought.findById(req.params.user_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found property with user id ${req.params.user_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Property with user id " + req.params.user_id
            });
          }
        } else res.send(data);
      });
};
exports.updateUser = (req, res) => {
  if(!req.body) {
    res.status(400).send(
      {
        message: "content cannot be empty"
      }
    );
  }
  Bought.updateUserId (req.params.property_id,req.params.user_id, res);
}
// Update a Cser identified by the cserId in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Bought.updateById(
        req.params.property_id,
        new Bought(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Property with id ${req.params.property_id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Property with id " + req.params.property_id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a Cser with the specified cserId in the request
exports.delete = (req, res) => {
    Bought.remove(req.params.property_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found property with id ${req.params.property_id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Property with id " + req.params.property_id
            });
          }
        } else res.send({ message: `Property was deleted successfully!` });
      });
};

// Delete all Csers from the database.
exports.deleteAll = (req, res) => {
    Bought.removeAll((err, data) => {
        if (err) 
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all property."
          });
        else res.send({ message: `All property were deleted successfully!` });
      });
  
};