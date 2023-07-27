// Get our dependencies
var express = require('express');
var app = express();
var { auth } = require('express-oauth2-jwt-bearer');
var mysql = require('mysql2');
require('dotenv').config();
var { networkInterfaces } = require('os');

//Create connection to DB
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}); 
connection.connect((err) => {
    if (err) {
        console.log("An error has ocurred connecting to DB, please check credentials" + err);
        throw err;
    }
})

// We’ll create a middleware function to validate the access token when our API is called
// Note that the audience field is the identifier you gave to your API.
var jwtCheck = auth({
    audience: 'analyst_api_id',
    issuerBaseURL: 'https://dev-5lh8pmfhr4e8svyt.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});
// Enable the use of the jwtCheck middleware in all of our routes
app.use(jwtCheck);

//Auth0 Auth function
var guard = function (req, res, next) {
    var adminPerms = 'admin'
    var genPerms = 'general'

    //Check all paths of this app
    if (req.path == '/movies' || req.path == '/reviewers' || req.path == '/publications') {
        //check if either of the permissions exist in the scope of the auth received
        if (req.auth.payload.scope.includes(genPerms) || req.auth.payload.scope.includes(adminPerms)) {
            next();
        } else {
            res.status(403).send({ message: 'Forbidden' });
        }
    } else if (req.path == '/pending') {
        //Check if the scope contains admin
        if (req.auth.payload.scope.includes(adminPerms)) {
            next();
        } else {
            res.status(403).send({ mesage: 'Forbidden' });
        }
    } else if (req.path == '/') {
        //Don't do any check
        next();
    }
};
app.use(guard);


// If we do not get the correct credentials, we’ll return an appropriate message
app.use(function (err, req, res, next) {
    if (req.path != "/") {
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({ message: 'Missing or invalid token' });
        }
    } else {
        next();
    }
});

//Display server's IP when requesting /
app.get('/', function (req, res) {
    /*var nets = networkInterfaces();
    var results = {};
    for (var name of Object.keys(nets)) {
        for (var net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    res.status(200).json(results)*/
    res.status(200)
})

function getMoviesFromDB(callback) {
    connection.query("select * from " + process.env.DB_NAME + ".moviereview where pending = false", function (err, rows) {
        callback(err, rows);
    });
}

// Implement the movies API endpoint
app.get('/movies', function (req, res) {
    getMoviesFromDB(function (err, result) {
        if (err) {
            res.status(500).json({ message: err })
        } else {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(409).json({ message: "Movies not found" })
            }
        }
    })
})

// Implement the reviewers API endpoint
function getReviewersFromDB(callback) {
    connection.query("select * from " + process.env.DB_NAME + ".reviewer", function (err, rows) {
        callback(err, rows);
    });
}

app.get('/reviewers', function (req, res) {
    getReviewersFromDB(function (err, authors) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            if (authors) {
                res.status(200).json(authors);
            } else {
                res.status(409).json({ message: "Authors not found" });
            }
        }
    });
})

// Implement the publications API endpoint
function getPublicationsFromDB(callback) {
    connection.query("SELECT * FROM movie_db.publication", function (err, rows) {
        callback(err, rows);
    });
}

app.get('/publications', function (req, res) {
    getPublicationsFromDB(function (err, publications) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            if (publications) {
                res.status(200).json(publications);
            } else {
                res.status(409).json({ message: "Publications not found" });
            }
        }
    });
})


function getPendingMoviesFromDB(callback) {
    connection.query("select * from " + process.env.DB_NAME + ".moviereview where pending = true", function (err, rows) {
        callback(err, rows);
    });
}
// Implement the pending reviews API endpoint
app.get('/pending', function (req, res) {
    getPendingMoviesFromDB(function (err, result) {
        if (err) {
            res.status(500).json({ message: err })
        } else {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(409).json({ message: "Movies not found" })
            }
        }
    })
})

// Launch our API Server and have it listen on port 8080.
module.exports = app.listen(8080);
module.exports.db = connection;