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
router.post("/", isLoggedIn, function (req, res) {
    //  get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author};
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
router.get("/new", isLoggedIn,function(req, res) {
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
router.get("/:id/edit", function(req, res) {
    //  Is user logged in?
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err) {
                res.redirect("/campgrounds");
            } else {
                //  Does user own campground?
                if(foundCampground.author.id.equals(req.user._id)) {      // foundCampground.author.id is an object 
                    res.render("campgrounds/edit", {campground: foundCampground});
                } else {
                    res.send("YOU DO NOT HAVE PERMISSION!");
                }
            }
        });
    } else {
        res.send("You need to be logged in!!");
    }

        //  let the user edit, delete
});

//  UPDATE CAMPGROUND ROUTE
router.put("/:id", function(req, res) {
    //  find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            //  redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//  DESTROY CAMPGROUND ROUTE
router.delete("/:id", function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//  MIDDLEWARE - check if logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;