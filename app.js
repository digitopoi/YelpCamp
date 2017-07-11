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
    image: String 
});
//  model
var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    { 
        name: "Salmon Creek", 
        image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg" 
    }, function(err, campground) {
        if(err){
            console.log(err);
        } else {
            console.log("CREATED CAMPGROUND: ");
            console.log(campground);
        }
    });
//  TEMP CAMPGROUND ARRAY - [{name: <name>, image: <url>}]
var campgrounds = [
    { name: "Salmon Creek", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg" },
    { name: "Granite Hill", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg" }

];


app.get("/",
    function(req, res) {
        res.render("landing");
    });

app.get("/campgrounds",
    function(req, res) {
        res.render("campgrounds", {campgrounds: campgrounds});
    });

app.post("/campgrounds",
    function (req, res) {
        //  get data from form and add to campgrounds array
        var name = req.body.name;
        var image = req.body.image;
        var newCampground = { name: name, image: image };
        campgrounds.push(newCampground);
        //  redirect to campgrounds page
        res.redirect("/campgrounds");
    });

app.get("/campgrounds/new",
    function(req, res) {
        res.render("new.ejs");
    });

//  SERVER
app.listen(process.env.PORT, process.env.IP, //  for Cloud9 - otherwise (3000)
    function () {
        console.log("The YelpCamp server has started!");
    });