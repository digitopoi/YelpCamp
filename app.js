//  Express / EJS 
var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    Campground  = require("./models/campground");

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//  ROOT ROUTE
app.get("/",
    function(req, res) {
        res.render("landing");
    });

//  INDEX ROUTE - show all campgrounds
app.get("/campgrounds",
    function(req, res) {
        //  Get all campgrounds from db
        Campground.find({}, function(err, campgrounds) {
            if(err) {
                console.log(err);
            } else {
                res.render("index", {campgrounds: campgrounds});
            }
        });
    });

//  CREATE ROUTE - Add new campground to the database
app.post("/campgrounds",
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
app.get("/campgrounds/new",
    function(req, res) {
        res.render("new.ejs");
    });
    
//  SHOW ROUTE - Displays info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //  find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            //  render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

//  SERVER
app.listen(process.env.PORT, process.env.IP, //  for Cloud9 - otherwise (3000)
    function () {
        console.log("The YelpCamp server has started!");
    });