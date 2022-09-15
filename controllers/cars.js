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

// carRouter.get("/:make", (req, res) => {
//     Car.Find({}, (error, someCars) => {
//         res.render("make.ejs", {
//             specCars: someCars,
//         });
//     });
// });




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

// search feature
// carRouter.post("/", (req, res) => {
//     console.log("Hi")
//     if(req.query.search) {
//         const regex = new RegExp(escapeRegex(req.query.search), "gi");
//         Car.find({"make": regex}, (error, foundCars) => {
//             if(error) {
//                 console.log(error)
//             } else{
//                 res.render("make.ejs", {
//                     cars: foundCars
//                 });
//             }
//         });
//     }
// });

// carRouter.get("/:make", (req, res) => {
//     let search_key = req.params.select;
//     Car.find({make: search_key})
//         .then(cars => res.send(allCars))
//         .catch(err => res.status(404).json({success: false}));
// });



// carRouter.get("/:make", (req, res) => {
//   Car.find({make: "Nissan"}, (error, data) => {
//     if(error){
//         console.log(error)
//     } else {
//         res.send(data)
//         };
//     });  
// })





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


// regex function for fuzzy search
// function escapeRegex(text) {
//     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// };

// exports
module.exports = carRouter;