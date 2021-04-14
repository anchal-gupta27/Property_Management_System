const sql = require("./db.js");
const Property = function(property) {
    this.property_id = property.property_id;
    this.user_id = property.user_id;
    this.property_type = property.property_type;
    this.property_name = property.property_name;
    this.property_desc = property.property_desc;
    this.cost = property.cost;
    
  };
  
  Property.create = (newProperty, result) => {
    sql.query("INSERT INTO property SET ?", newProperty, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created property: ", { property_id: res.insertId, ...newProperty });
      result(null, { property_id: res.insertId, ...newProperty });
    });
  };
  
  Property.findById = (user_id, result) => {
    sql.query(`SELECT p.*,u.* FROM property p, user_account u WHERE p.user_id = ${user_id} and u.user_id = ${user_id}`, (err, res) => {
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
Property.filterById = (user_id, result) => {
  sql.query(`SELECT p.*, u.* FROM property p, user_account u WHERE p.user_id != ${user_id} and u.user_id=p.user_id`, (err, res) => {
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

Property.getAll = result => {
sql.query("SELECT * FROM property", (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }

  console.log("property: ", res);
  result(null, res);
});
};

Property.updateById = (property_id, property, result) => {
sql.query(
  "UPDATE property SET property_type = ?, property_name = ?, property_desc = ?, cost = ?, property_status = ?, user_id = ? WHERE property_id = ?",
  [property.property_type, property.property_name, property.property_desc, property.cost, property.property_status, property.user_id, property.property_id],
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

    console.log("updated property: ", { property_id: property_id, ...property });
    result(null, { property_id: property_id, ...property });
  }
);
};

Property.remove = (property_id, result) => {
sql.query("DELETE FROM property WHERE property_id = ?", property_id, (err, res) => {
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

  console.log("deleted property with id: ", property_id);
  result(null, res);
});
};
Property.removeAll = result => {
    sql.query("DELETE FROM property", (err, res) => {
      if (err) { 
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} property`);
      result(null, res);
    });
  };


  
  module.exports = Property;