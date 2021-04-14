module.exports = app => {
    const bought = require("../controllers/bought.controller.js");
  
    // Create a new user
    app.post("/bought", bought.create);
  
    // Retrieve all user
    app.get("/bought", bought.findAll);
  
    // Retrieve a single user with userId
    app.get("/bought/:user_id", bought.findOne);
  
    // Update a user with userId
    app.put("/bought/:property_id", bought.update);
    app.put("/boughtUpdate/:property_id/:user_id", bought.updateUser);
    // Delete a user with userId
    app.delete("/bought/:property_id", bought.delete);
  
    // Create a new user
    app.delete("/bought", bought.deleteAll);
  };