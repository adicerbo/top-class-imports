// dependencies
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');
const methodOverride = require("method-override")
const carController = require("./controllers/cars.js")

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
app.use(methodOverride("_method"));
app.use("/", carController);

// controllers
app.use("/cars", carController);
const Car = require("./models/cars.js");


// listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}.`))