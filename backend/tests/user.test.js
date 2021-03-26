const mongoose = require("mongoose");
const createServer = require("./testingserver");
const db = require("../models");
const User = db.user;
const Course = db.course;
const Category = db.category;
const Business = db.business;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var crypto = require('crypto');
const supertest = require('supertest');
jest.setTimeout(30000);

beforeEach((done) => {
    // Create a db for testing
    const uri = "mongodb+srv://root:root@rebootretreats0.mmh9e.mongodb.net/testDB?retryWrites=true&w=majority";

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
        .catch(err => {
            console.error("Connection error", err);
            process.exit();
        });
    // Create a user account
    const user = new User({
        username: "User1",
        email: "user@gmail.com",
        password: bcrypt.hashSync("user1234", 8),
        isVerified: true
    });
    Role.find(
        {
            name: { $in: ["user"] }
        },
        (err, roles) => {
            if (err) {
                console.log(err);
                return;
            }

            user.roles = roles.map(role => role._id);
            user.save(err => {
                if (err) {
                    console.log(err);
                    return;
                }
                done();
            });
        }
    );

    
    

});
afterEach((done) => {
    // drop the testing db
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

const app = createServer();

// function for initiating Roles in db
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

            });

            new Role({
                name: "business"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
;
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

            });
        }
    });
};




// Test case of /api/user/enroll
it("POST /api/user/enroll", async () => {
    // create a toy course
    const course = await Course.create({
        "category":"programming",
        "title":"OO Design2",
        "description":"Hello World",
        "facilitator":"Bill Quan",
        "startDate":"9/14/2020",
        "endDate":"10/14/2020",
        "startTime":Date("10:30"),
        "endTime":Date("12:30"),
        "repeatDay":["MON","FRI"],
        "frequency":"every week",

        "location":{
            "address1":"38 Clayton Road",
            "address2":"None",
            "city":"Melbourne",
            "state":"VIC",
            "postCode":"3049"
        },
        "maxMembers":"20",
        "minMembers":"10",
        "promoImage":"none",
        "prerequisites":"none",
        "additionalInformation":"none",
        "business": {
            "businessName": "Monash",
            "ABN": "123456",
            "phone": "041411111",
            "email": "user@gmail.com",
            "address": "",
            "decriptionOfBusiness": "test",
            "businessId": "5f7b13461e4daab562138337"
        },
        "userId":"5f7b13461e4daab562138331",
        "cost":"40"
    });
    var token="";
    var id="";

    // Sign in the user account
    const res = await supertest(app)
        .post("/api/auth/signin")
        .send({
            username: "User1",
            password: "user1234"
        });
    token = res.body.accessToken;
    id = res.body.id;

    // Use /api/user/enroll to enroll the user into the course
    const res2 = await supertest(app)
        .post("/api/user/enroll")
        .set({'Content-Type': 'application/json',
            'x-access-token': token})
        .send({
            userId: id,
            courseId: course._id
        })
    console.log(res2.status);
    // Expect the request to be successful
    expect(res2.status).toEqual(200);
    const c = await Course.findById(course._id).exec();
    // Check if the user has enrolled into the course
    expect(c).not.toBeNull();
    expect(c.enrolledMembers).not.toBeNull();
    expect(c.enrolledMembers.length).toEqual(1);
    expect(String(c.enrolledMembers[0].userId)).toEqual(id);

});