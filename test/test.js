require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
let mocha = require("mocha");
let server = require("../server");
const carRouter = require("../controllers/cars");
const Car = require("../models/cars");

chai.use(chaiHttp);
chai.should();

describe('routes', () => {
    let carId;

    // seed the database with some test data before each test
    beforeEach(async () => {
        const car = new Car({
            name: "test-car",
            make: "test-make",
            year: 2022
        });
        await car.save();
        carId = car._id.toString();
    });

    // clear the database after each test
    afterEach(async () => {
        await Car.deleteMany();
    });

    // test get route
    describe("GET /cars", () => {
        it("It should get all cars", (done) => {
            chai.request(server)
                .get("/cars")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});

