// server.js





// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost:27017');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");




//  models
// timeline
require('./model/timeline.js');
// routes
require('./routes/timelinesRoutes.js')(app);
// app timeline_admin.html

//timenotes
require('./model/timenote.js');
// routes
require('./routes/timenotesRoutes.js')(app);
// app timeline_admin.html


// userlogin
require('./model/userlogin.js');

// passwordRoutes
require('./routes/passwordRoutes.js')(app);
// routes
require('./routes/userloginRoutes.js')(app);




require('./routes/frontendRoutes.js')(app);
