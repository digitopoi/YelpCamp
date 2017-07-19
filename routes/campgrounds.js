var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//  INDEX ROUTE - show all campgrounds
router.get("/", function(req, res) {
    //  Get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if(err) {
                console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
        }
    });
});

//  CREATE ROUTE - Add new campground to the database
router.post("/",
    function (req, res) {
        //  get data from form and add to campgrounds array
        var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var newCampground = { name: name, image: image, description: desc };
        //  Create new campground and save to database
        Campground.create(newCampground, function(err, newlyCreated) {
            if(err){
                console.log(err);
            } else {
                //  redirect to campgrounds page
                res.redirect("/campgrounds");
            }
        });
    });

//  NEW ROUTE - Display a form to make a campground
router.get("/new",
    function(req, res) {
        res.render("campgrounds/new");
    });
    
//  SHOW ROUTE - Displays info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;