module.exports = app => {
    const sold = require("../controllers/sold.controller.js");
  
    // Create a new user
    app.post("/sold", sold.create);
  
    // Retrieve all user
    app.get("/sold", sold.findAll);
  
    // Retrieve a single user with userId
    app.get("/sold/:user_id", sold.findOne);
  
    // Update a user with userId
    app.put("/sold/:property_id", sold.update);
  
    // Delete a user with userId
    app.delete("/sold/:property_id", sold.delete);
  
    // Create a new user
    app.delete("/sold", sold.deleteAll);
  };