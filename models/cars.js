// dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// car schema
const carSchema = new mongoose.Schema({
    name: {type: String, required: true},
    make: {type: String, required: true},
    year: {type: Number, required: true},
    description: {type: String, required: false},
    price: {type: Number, required: false},
    image: {type: String, required: false},
    link: {type: String, required: false}
})

const Car = mongoose.model("Car", carSchema);

module.exports = Car;