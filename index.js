
const express = require("express");
var cors = require('cors')
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res)=>{
    res.json({ message:"welcome!!"});
});

require("./routes/user.routes.js")(app);
require("./routes/property.routes.js")(app);
require("./routes/sold.routes.js")(app);
require("./routes/bought.routes.js")(app);
require("./routes/payment.routes.js")(app);
require("./routes/us.routes.js")(app);


app.listen(3000, () => {
    console.log("at 3000");
});

