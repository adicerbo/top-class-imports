require("dotenv").config();
// dependencies
const express = require("express");
const methodOverride = require("method-override")
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const carController = require("./controllers/cars.js")



// connect to database via heroku/locally
const MONGODB_URI = process.env.MONGODB_URI;

// database configuration
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}
);

// database connection error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static('public'))
app.use("/", carController);

// controllers
const Car = require("./models/cars.js");

// listener
module.exports = app.listen(process.env.PORT, () => console.log(`server is listening on port`, process.env.PORT))
