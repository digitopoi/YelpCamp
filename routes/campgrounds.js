var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//  INDEX ROUTE - show all campgrounds
router.get("/", function(req, res) {
    //  Get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user, page: "campgrounds"});
        }
    });
});

//  CREATE ROUTE - Add new campground to the database
router.post("/", middleware.isLoggedIn, function (req, res) {
    //  get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    //  Create new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err){
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            //  redirect to campgrounds page
            req.flash("success", "Thank you!\nCampground successfully added to the database.");
            res.redirect("/campgrounds");
        }
    });
});

//  NEW ROUTE - Display a form to make a campground
router.get("/new", middleware.isLoggedIn,function(req, res) {
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

//  EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            req.flash("error", "Campground not found.");
            res.redirect("back");
        }
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//  UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    //  find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            req.flash("error", "Campground not found.");
            res.redirect("/campgrounds");
        } else {
            //  redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//  DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;