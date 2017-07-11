var express = require("express");
var app = express();
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

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