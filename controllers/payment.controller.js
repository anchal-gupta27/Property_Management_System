const Payment = require("../models/payment.model.js");

// Create and Save a new Cser
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    const payment = new Payment({
       payment_id: req.body.payment_id,
       amount: req.body.amount,
       property_id: req.body.property_id,
       installment: req.body.installment,
      total: req.body.total

      });
    
      // Save Cser in the database
      Payment.create(payment, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Cser."
          });
        else res.send(data);
      });
};

// Retrieve all Csers from the database.
exports.findAll = (req, res) => {
    Payment.getAll((err, data) => {
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
    Payment.findById(req.params.property_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found payment with id ${req.params.property_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving payment with id " + req.params.property_id
            });
          } 
        } else res.send(data);
      });
};

exports.updatePay = (req, res) => {
  if(!req.body) {
    res.status(400).send(
      {
        message: "content cannot be empty"
      }
    );
  }
  Payment.updatePayment(req.params.amount,req.params.installment, req.params.property_id, res);
}

// Update a Cser identified by the cserId in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Payment.updateById(
        req.params.payment_id,
        new Payment(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found payment with id ${req.params.payment_id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating payment with id " + req.params.payment_id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a Cser with the specified cserId in the request
exports.delete = (req, res) => {
    Payment.remove(req.params.payment_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found payment with id ${req.params.payment_id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete payment with id " + req.params.payment_id
            });
          }
        } else res.send({ message: `payment was deleted successfully!` });
      });
};

// Delete all Csers from the database.
exports.deleteAll = (req, res) => {
    Payment.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all payments."
          });
        else res.send({ message: `All payments were deleted successfully!` });
      });
  
};