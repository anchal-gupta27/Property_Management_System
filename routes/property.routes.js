module.exports = app => {
    const property = require("../controllers/property.controller.js");
  
    // Create a new user
    app.post("/property", property.create);
  
    // Retrieve all user
    app.get("/property", property.findAll);
  
    // Retrieve a single user with userId
    app.get("/property/:user_id", property.findOne);
    app.get("/buyproperty/:user_id", property.filterById);
    // Update a user with userId
    app.put("/property/:property_id", property.update);
  
    // Delete a user with userId
    app.delete("/property/:property_id", property.delete);
  
    // Create a new user
    app.delete("/property", property.deleteAll);
  };