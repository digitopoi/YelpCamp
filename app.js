var express = require("express");
var app = express();
app.set("view engine", "ejs");
//  TEMP CAMPGROUND ARRAY - [{name: <name>, image: <url>}]
var campgrounds = [
    { name: "Salmon Creek", img: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg" },
    { name: "Granite Hill", img: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg" },
    { name: "Mountain Goat's Rest", img: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg" },

];


app.get("/",
    function(req, res) {
        res.render("landing");
    });

app.get("/campgrounds",
    function(req, res) {
        res.render("campgrounds");
    });


//  SERVER
app.listen(3000,
    function () {
        console.log("The YelpCamp server has started!")
    });