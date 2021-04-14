const sql = require("./db.js");
const Sold = function(sold) {
    this.property_id = sold.property_id;
    this.property_type = sold.property_type;
    this.property_name = sold.property_name;
    this.property_desc = sold.property_desc;
    this.user_id = sold.user_id;
  };
  
  Sold.create = (newSold, result) => {
    sql.query("INSERT INTO sold SET ?", newSold, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created property: ", { property_id: res.insertId, ...newSold });
      result(null, { property_id: res.insertId, ...newSold });
    });
  };
  
  Sold.findById = (user_id, result) => {
    sql.query(`SELECT * FROM sold WHERE user_id = ${user_id}`, (err, res) => {
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

Sold.getAll = result => {
sql.query("SELECT * FROM sold", (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }

  console.log("property: ", res);
  result(null, res);
});
};

Sold.updateById = (property_id, sold, result) => {
sql.query(
  "UPDATE sold SET property_type = ?, property_name = ?, property_desc = ?, user_id = ?  WHERE property_id = ?",
  [sold.property_type, sold.property_name, sold.property_desc, sold.user_id, sold.property_id],
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

    console.log("updated property: ", { property_id: property_id, ...sold });
    result(null, { property_id: property_id, ...sold });
  }
);
};

Sold.remove = (property_id, result) => {
sql.query("DELETE FROM sold WHERE property_id = ?", property_id, (err, res) => {
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

  console.log("deleted sold with id: ", property_id);
  result(null, res);
});
};
Sold.removeAll = result => {
    sql.query("DELETE FROM sold", (err, res) => {
      if (err) { 
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} property`);
      result(null, res);
    });
  };
  
  module.exports = Sold;