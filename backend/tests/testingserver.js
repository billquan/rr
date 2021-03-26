const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Mongoose helps connect to MongoDB Database
const bodyParser = require("body-parser");

function createServer() {
    const app = express();
    var corsOptions = {
        origin: "http://localhost:8081"
    };

    app.use(cors(corsOptions)); // cors middleware
    app.use(express.json()); // Parses JSON from server
// parse requests of content-type - application/json
    app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));


    const db = require("../models");
    const Role = db.role;


// Once the connection is open, the message is sent
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to the application." });
    });

// Import the files
    const coursesRouter = require("../routes/courses");
    const categoriesRouter = require("../routes/categories");
    const enrolmentRouter = require("../routes/enrolment");
// Use the files
// e.g. when visiting the route URL /courses, it loads everything in the coursesRouter

//app.use("/users", usersRouter);
// routes
    require('../routes/auth.routes')(app);
    require('../routes/user.routes')(app);
    app.use("/categories", categoriesRouter);
    app.use("/courses", coursesRouter);
    app.use("/api/enroll", enrolmentRouter);
// Starts the server (listening on the port)
    return app
}

module.exports=createServer;




function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "business"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'business' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}