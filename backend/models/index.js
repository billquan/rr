const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.token = require("./token.model");
db.course = require("./course.model");
db.category = require("./category.model");
db.business = require("./business.model");
db.payment = require("./payment.model");
db.ROLES = ["user", "admin", "business"];

module.exports = db;