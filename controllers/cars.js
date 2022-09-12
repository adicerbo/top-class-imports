// dependencies
const express = require("express");
const carRouter = express.Router();
const Car = require("../models/cars.js")

// index
carRouter.get("/", (req, res) => {
    res.render("index.ejs")
})
// new

// delete

// update

// create

// create
carRouter.post("/", (req, res) => {
    Car.create(req.body, (error, createdCar) => {
        res.send(createdCar);
    })
});

// edit

// show



// exports
module.exports = carRouter;