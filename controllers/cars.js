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
carRouter.get("/new", (req, res) => {
    res.render("new.ejs");
});

// delete
carRouter.delete("/:id", (req, res) => {
    Car.findByIdAndDelete(
        req.params.id,
        (error, data) => {
            res.redirect("/")
        })
})

// update
carRouter.put("/:id", (req, res) => {
    Car.findByIdAndUpdate(
        req.params.id,
        req.body, {
        new: true
    },
        (error, updatedCar) => {
            res.redirect(`/cars/${req.params.id}`);
        });
});


// create
carRouter.post("/", (req, res) => {
    Car.create(req.body, (error, createdCar) => {
        res.redirect("/");
    })
});


// edit
carRouter.get("/:id/edit", (req, res) => {
    Car.findById(
        req.params.id,
        (error, foundCar) => {
            res.render("edit.ejs", {
                car: foundCar
            });
        });
});

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