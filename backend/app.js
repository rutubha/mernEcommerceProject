const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

const errorMiddleware = require("./middleware/error");
//config
if(process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({path:"./backend/config/config.env"});
}

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload());

//Route Imports 
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware for Errors
app.use(errorMiddleware);


module.exports = app;