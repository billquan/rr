/*
 For development use only, should be deleted/disabled before going into production
 */

const router = require("express").Router(); // Express router
const Course = require("../models/course.model");
var currentDate = new Date();

// Returns all the courses in the database in JSON
router.route("/").get((req, res) => {
    Course.find({endDate:{$gte:currentDate}, passed: true })
    .then((courses) => res.json(courses))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Adding a course
router.route("/add").post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const facilitator = req.body.facilitator;
  const date = Date.parse(req.body.date);
  const location = req.body.location;
  const maxMembers = req.body.maxMembers;
  const cost = req.body.cost;

  // Create a course using the variables
  const newCourse = new Course({
    title,
    description,
    facilitator,
    date,
    location,
    maxMembers,
    cost,
  });

  // Save the course
  newCourse
    .save()
    .then(() => res.json("Course added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Returns just the course based on its id
router.route("/:id").get((req, res) => {
  Course.find({ _id:req.params.id, startDate:{$gte:currentDate}, passed: true })
    .then((courses) =>{
            courses.forEach(course => course.enrolledMembers=undefined);
            res.json(courses);
        })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Deletes the course based on its id
router.route("/:id").delete((req, res) => {
  Course.findByIdAndDelete(req.params.id)
    .then((course) => res.json("Course deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getHistoryCourses/:userId").get((req, res) => {
    Course.find({ userId:req.params.userId, endDate:{$lte:currentDate}, passed: true })
        .then((course) => res.json(course))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Course.findById(req.params.id)
    .then((course) => {
      course.title = req.body.title;
      course.description = req.body.description;
      course.facilitator = req.body.facilitator;
      course.date = Date.parse(req.body.date);
      course.location = req.body.location;
      course.maxMembers = req.body.maxMembers;
      course.cost = req.body.cost;

      course
        .save()
        .then(() => res.json("Course updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).jason("Error: " + err));
});

module.exports = router;
