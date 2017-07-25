//  Express / EJS 
var express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

//  Require routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp2");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
//  Seed the database
// seedDB();

//  PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I like to eat tacos",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());  
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//  MIDDLEWARE - Provide user data to every page
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");              //  Provide error flash to every page
    res.locals.success = req.flash("success");            //  Provide success flash to every page
    next();
});

//  Use routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//  ===================================
//              SERVER CONFIG
//  ===================================
//  c9
// app.listen(process.env.PORT, process.env.IP, //  for Cloud9 - otherwise (3000)
//     function () {
//         console.log("The YelpCamp server has started!");
//     });

//  localhost
app.listen(3000, function() {
    console.log("The YelpCamp server has started!");
});

