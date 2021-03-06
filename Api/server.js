// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var User     = require('./models/user');
var Ticket   = require('./models/tickets')
var bcrypt     = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
var mongoose   = require('mongoose');
var cors = require('cors');

//DONT FORGET TO CHANGE THIS SECRET KEY
var secret = "init123"

// this will let us get the data from a POST
const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: true,
    maxAge: 600,
  };

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;        // set our port

//Setting up the DB connection
mongoose.connect('mongodb://localhost:27017/tickify'); //Absolutely change this to your DB...

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
// middleware to use for all requests

router.use(function(req, res, next) {
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
        bcrypt.hash(user.password, saltRounds, function(err, hash) {
            user.password = hash;
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'user created!' });
            });
        });
    })

    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    })

    router.route('/users/:username&:password')
    .get(function(req, res) {
        User.findOne({ username: req.params.username, password: req.params.password}, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });

    router.route('/user/login/')
    .post(function(req, res) {
        var user = new User();      // create a new instance of the user model
        user.username = req.body.username;  // set the users name (comes from the request)
        user.password = req.body.password;
        User.findOne({ username: user.username}, function(err, dbuser) {
            if (err)
                res.send(err);
                
            
            bcrypt.compare(user.password, dbuser.password, function(err, compareResult) {
                console.log('Match!')
                // create a token
                var token = jwt.sign({ username: user.username }, secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.cookie("auth",token);
                res.cookie("user", user.username);
                res.status(200).send({ auth: true, token: token });
                console.log('executed');
            });
        });
    });

 //Router for Tickets: Creating, Editing, Posting and Deleting.
 router.route('/tickets')  
 //Get All tickets
 .get(function(req, res) {
    Ticket.find(function(err, tickets) {
        if (err)
            res.send(err);

        res.json(tickets);
    });
})

.post(function(req, res) {
    var ticket = new Ticket();      // create a new instance of the user model
    ticket.category = req.body.category;
    ticket.prioririty = req.body.prioririty;
    ticket.title = req.body.title;
    ticket.content = req.body.content;
    ticket.assigned = req.body.assigned;
    ticket.raised = req.body.raised;
    ticket.date = req.body.date;
    ticket.lastupdated = req.body.lastupdated;
        ticket.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'ticket created!' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);