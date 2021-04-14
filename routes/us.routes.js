module.exports = app => {
    const us = require("../controllers/us.controller.js");
  
    // Create a new user
  
  
    // Retrieve all user
    app.get("/us", us.findAll);
  
    // Retrieve a single user with userId
    app.get("/us/:user_id", us.findOne);
  
    // Update a user with userId
  
    // Delete a user with userId
    app.delete("/us/:user_id", us.delete);
  
    // Create a new user
    app.delete("/us", us.deleteAll);

    app.post("/us",us.login);
  };