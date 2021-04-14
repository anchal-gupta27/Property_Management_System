const connection = require("./db.js");
const { connect } = require("./db.js");
const sql = require("./db.js");

const Bought = function(bought) {
    this.property_id = bought.property_id;
    this.property_type = bought.property_type;
    this.property_name = bought.property_name;
    this.property_desc = bought.property_desc;
    this.user_id = bought.user_id;
  };
  
  Bought.create = (newbought, result) => {
    sql.query("INSERT INTO bought SET ?", newbought, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created property: ", { property_id: res.insertId, ...newbought });
      result(null, { property_id: res.insertId, ...newbought });
    });
  };
  
  Bought.findById = (user_id, result) => {
    console.log("Find by id model : ", user_id)
    sql.query(`SELECT * FROM bought WHERE user_id = ${user_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found property: ", res);
        result(null, res);
        return;
      }
      // not found user with the id
    result({ kind: "not_found" }, null);
});
};

Bought.getAll = result => {
sql.query("SELECT * FROM bought", (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }

  console.log("property: ", res);
  result(null, res);
});
};

Bought.updateUserId = (property_id,user_id,res) => {
      let store = `CALL updateInBought(${property_id},${user_id})`;
      sql.query(store,true,(error,results,fields) => {
        if(error) {
          return console.error(error.message);

        }
        console.log(results[0]);
        res.send("Updated successfully")
      });
}

Bought.updateById =  (property_id, bought, result) => {
  sql.query(
    "UPDATE bought SET property_type = ?, property_name = ?, property_desc = ?, user_id = ?  WHERE property_id = ?",
    [bought.property_type, bought.property_name, bought.property_desc, bought.user_id, bought.property_id],
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

      console.log("updated property: ", { property_id: property_id, ...bought });
      result(null, { property_id: property_id, ...bought });
    }
  );
};

Bought.remove = (property_id, result) => {
sql.query("DELETE FROM bought WHERE property_id = ?", property_id, (err, res) => {
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

  console.log("deleted bought with id: ", property_id);
  result(null, res);
});
};
Bought.removeAll = result => {
    sql.query("DELETE FROM bought", (err, res) => {
      if (err) { 
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} property`);
      result(null, res);
    });
  };
  
  module.exports = Bought;