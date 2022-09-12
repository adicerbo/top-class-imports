// dependencies
const express = require("express");
const app = express();
require("dotenv").config();
const session = require('express-session');
const mongoose = require('mongoose');

// database configuration
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// database connection error / success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// middleware
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));

// controllers
const carController = require("./controllers/cars.js");
const Car = require("./models/cars.js");
app.use("/cars", carController);

// create
app.post("/", (req, res) => {
    Car.create(req.body, (error, createdCar) => {
        res.send(createdCar);
    })
});

// listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}.`))