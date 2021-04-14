const sql = require("./db.js");
const User = function(user) {
    this.user_id = user.user_id;
    this.password = user.password;
  };

  User.login = (user, result) => {
    console.log("Entered here : ", user.user_id, user.password)
    sql.query("SELECT password FROM user WHERE user_id = ?",[user.user_id], (err,res)=> {
      if(err) {
        console.log("error: ",err);
        result(err,null);
        return;
      }
      else {
        result(null, res[0] ? res[0].password : null);
      }

    })
  }
  
  User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { user_id: res.insertId, ...newUser });
      result(null, { user_id: res.insertId, ...newUser });
    });
  };
  
  User.findById = (user_id, result) => {
    sql.query(`SELECT * FROM user WHERE user_id = ${user_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found user with the id
    result({ kind: "not_found" }, null);
});
};

User.getAll = result => {
sql.query("SELECT * FROM user", (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }

  console.log("users: ", res);
  result(null, res);
});
};



User.remove = (user_id, result) => {
sql.query("DELETE FROM user WHERE user_id = ?", user_id, (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }

  if (res.affectedRows == 0) {
    // not found user with the id
    result({ kind: "not_found" }, null);
    return;
  }

  console.log("deleted user with id: ", user_id);
  result(null, res);
});
};
User.removeAll = result => {
    sql.query("DELETE FROM user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };
  
  module.exports = User;