var mongoose = require("mongoose");

//  SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//  model
//  var Campground = mongoose.model("Campground", campgroundSchema);
//  now equals:

module.exports = mongoose.model("Campground", campgroundSchema);