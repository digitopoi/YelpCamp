//  Express / EJS 
var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser");

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//  SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
//  model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     { 
//         name: "Granite Hill", 
//         image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
//         description: "This is a huge granite hill, no bathrooms, no water, beautiful granite."
//     }, function(err, campground) {
//         if(err){
//             console.log(err);
//         } else {
//             console.log("CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
// });


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