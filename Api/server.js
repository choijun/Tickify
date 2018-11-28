// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var User     = require('./models/user');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

//Setting up the DB connection
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tickify'); //Absolutely change this to your DB...

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// on routes that end in /users
// ----------------------------------------------------
router.route('/users')


    // create a bear (accessed at POST http://localhost:8080/api/users)
    .post(function(req, res) {

        var user = new User();      // create a new instance of the user model
        user.username = req.body.username;  // set the users name (comes from the request)
        user.password = req.body.password;
        user.user_role = req.body.user_role;

        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'user created!' });
        });
    })

    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    })

    router.route('/users/:username&:password')

    // get the users with that id (accessed at GET http://localhost:8080/api/users/:username)
    .get(function(req, res) {
        User.findOne({ username: req.params.username, password: req.params.password}, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);