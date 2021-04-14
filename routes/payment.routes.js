module.exports = app => {
    const payment = require("../controllers/payment.controller.js");
  
    // Create a new user
    app.post("/payment", payment.create);
  
    // Retrieve all user
    app.get("/payment", payment.findAll);
  
    // Retrieve a single user with userId
    app.get("/payment/:property_id", payment.findOne);

    app.put("/payment/:amount/:installment/:property_id", payment.updatePay);
  
    // Update a user with userId
    app.put("/payments/:payment_id", payment.update);
  
    // Delete a user with userId
    app.delete("/payment/:payment_id", payment.delete);
  
    // Create a new user
    app.delete("/payment", payment.deleteAll);
  };