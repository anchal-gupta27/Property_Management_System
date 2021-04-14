module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    // Create a new user
    app.post("/users", users.create);
  
    // Retrieve all user
    app.get("/users", users.findAll);
  
    // Retrieve a single user with userId
    app.get("/users/:user_id", users.findOne);
  
    // Update a user with userId
    app.put("/users/:user_id", users.update);
  
    // Delete a user with userId
    app.delete("/users/:user_id", users.delete);
  
    // Create a new user
    app.delete("/users", users.deleteAll);
  };