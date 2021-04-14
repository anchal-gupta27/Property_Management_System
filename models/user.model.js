const sql = require("./db.js");
const User = function(user) {
    this.user_id = user.user_id;
    this.email = user.email;
    this.fname = user.fname;
    this.lname = user.lname;
    this.dob = user.dob;
    this.address = user.address;
    this.phone = user.phone;
    this.password = user.password;
  };
  
  User.create = (newUser, result) => {
    sql.query("INSERT INTO user_account SET ?", newUser, (err, res) => {
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
    sql.query(`SELECT * FROM user_account WHERE user_id = ${user_id}`, (err, res) => {
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
sql.query("SELECT * FROM user_account", (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }

  console.log("users: ", res);
  result(null, res);
});
};

User.updateById = (user_id, user, result) => {
sql.query(
  "UPDATE user_account SET email = ?, fname = ?, lname = ?, dob = ?, address = ?, phone = ?, password = ?  WHERE user_id = ?",
  [user.email, user.fname, user.lname, user.dob, user.address, user.phone,user.password, user_id],
  (err, res) => {
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

    console.log("updated user: ", { user_id: user_id, ...user });
    result(null, { user_id: user_id, ...user });
  }
);
};

User.remove = (user_id, result) => {
sql.query("DELETE FROM user_account WHERE user_id = ?", user_id, (err, res) => {
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
    sql.query("DELETE FROM user_account", (err, res) => {
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