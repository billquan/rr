/*
 For development use only, should be deleted/disabled before going into production
 */


const router = require("express").Router(); // Express router
let User = require("../models/category.model"); // Require the Mongoose model
const Category = require("../models/category.model");

// Returns all the categories in the database in JSON
router.route("/").get((req, res) => {
  User.find()
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add a category
router.route("/add").post((req, res) => {
  const category = req.body.category;
  const description = req.body.description;
  const imgUrl = req.body.imgUrl;
  const courses = req.body.courses;

  // Create a new category using the variables
  const newCategory = Category({
    category,
    description,
    imgUrl,
    courses,
  });

  // Save the category
  newCategory
    .save()
    .then(() => res.json("Category added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Return the category based on its id
router.route("/:id").get((req, res) => {
  Category.findById(req.params.id)
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Return the category based on its category name
router.route("/find/:categoryName").get((req, res) => {
  Category.find({ category: req.params.categoryName })
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Deletes the category based on its id
router.route("/:id").delete((req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => res.json("Category deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Category.findById(req.params.id)
    .then((category) => {
      category.category = req.body.category;
      description = req.body.description;
      imgUrl = req.body.imgUrl;
      courses = req.body.courses;

      category
        .save()
        .then(() => res.json("Category updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).jason("Error: " + err));
});

module.exports = router;
