const sql = require("./db.js");
const Payment = function(payment) {
    this.payment_id = payment.payment_id,
    this.amount = payment.amount,
    this.property_id = payment.property_id,
    this.installment = payment.installment,
    this.total = payment.total
  };
  
  Payment.create = (newPayment, result) => {
    sql.query("INSERT INTO payment SET ?", newPayment, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created payment: ", { payment_id: res.insertId, ...newPayment });
      result(null, { payment_id: res.insertId, ...newPayment});
    });
  };
  
  Payment.findById = (property_id, result) => {
    sql.query(`SELECT * FROM payment WHERE property_id = ${property_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found payment: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found payment with the id
    result({ kind: "not_found" }, null);
});
};

Payment.getAll = result => {
sql.query("SELECT * FROM payment", (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }

  console.log("payments: ", res);
  result(null, res);
});
};

Payment.updatePayment = (amount,installment,property_id,res) => {
  let pay = `CALL EMIcalculator(${amount},${installment},${property_id})`;
  sql.query(pay,true,(error,results) => {
    if(error) {
      return console.error(error.message);

    }
    console.log(results[0]);
    res.send({message: "Updated successfully"})
  });
}

Payment.updateById = (payment_id, payment, result) => {
sql.query(
  "UPDATE payment SET amount = ?, property_id = ?, user_id = ?, paydate = ? WHERE payment_id = ?",
  [payment.amount, payment.property_id,payment.user_id, payment.paydate, payment.payment_id],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found payment with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated payment: ", { payment_id: payment_id, ...payment });
    result(null, { payment_id: payment_id, ...payment });
  }
);
};

Payment.remove = (payment_id, result) => {
sql.query("DELETE FROM payment WHERE payment_id = ?", payment_id, (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }

  if (res.affectedRows == 0) {
    // not found payment with the id
    result({ kind: "not_found" }, null);
    return;
  }

  console.log("deleted payment with id: ", payment_id);
  result(null, res);
});
};
Payment.removeAll = result => {
    sql.query("DELETE FROM payment", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} payments`);
      result(null, res);
    });
  };
  
  module.exports = Payment;