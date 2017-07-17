var mongoose = require("mongoose");
var Campground = require("./models/campground");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Redneck Riviera", 
        image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
        
    },
    {
        name: "Beach Bliss", 
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
        
    }
];

function seedDB() {
    //  Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds!!");   
        }
    });
    
    //  Add a few campgrounds
    data.forEach(function(seed) {
        Campground.create(seed, function(err, data) {
            if(err) {
                console.log(err);
            } else {
                console.log("added a campground!")
            }
        });
    });
    
    //  Add a few comments
}

module.exports = seedDB;
