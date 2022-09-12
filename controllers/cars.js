// dependencies
const express = require("express");
const carRouter = express.Router();
const Car = require("../models/cars.js")

// index
carRouter.get("/", (req, res) => {
    Car.find({}, (error, allCars) => {
         res.render("index.ejs", {
            cars: allCars,
         });
    });
});
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
carRouter.get("/:id", (req, res) => {
    Car.findById(req.params.id, (err, foundCar) => {
        res.render("show.ejs", {
            car: foundCar,
        });
    });
});


// exports
module.exports = carRouter;