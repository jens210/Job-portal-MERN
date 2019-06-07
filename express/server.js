/**** External libraries ****/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const checkJwt = require('express-jwt');
const mongoose = require('mongoose');

/****** Configuration *****/
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));
const port = (process.env.PORT || 8080);

/****** Middleware *****/
// Additional headers to avoid triggering CORS security errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

let openPaths = [
    '/api/users/login',
    '/api/users/register',
    '/api/categories',
    '/api/jobs',
    '/api/areas'
];

// Validate jwt
app.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: openPaths })
);
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.message });
    }
});

/****** Mongoose *****/
const dbUrl = process.env.REACT_APP_MONGO;
mongoose.connect(`${dbUrl}`, { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB connection is open.");
});

/****** Routes *****/
let jobRouter = require('./routes/job_router');
app.use('/api', jobRouter);

let usersRouter = require('./routes/users_router');
app.use('/api/users', usersRouter);

/**** catch all route****/
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`API running on port ${port}!`));

