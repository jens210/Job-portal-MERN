let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let Job = require('../models/job');
let User = require('../models/user');

router.post('/register', (req, res) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.findOne({
        username: req.body.username
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    newUser.password = hash;
                    User.create(newUser)
                        .then(user => { res.json({ status: `User ${user.username} created` }) })
                        .catch(err => { res.send(err) })
                })
            } else { res.json({ error: 'Username already exists' }) }
        })
        .catch(err => { res.send(err) })
});


// LOGIN
router.post('/login', (req, res) => {

    if (!req.body.username || !req.body.password) {
        let msg = "Username or password missing!";
        console.error(msg);
        res.status(401).json({ msg: msg });
        return;
    }

    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        const payload = { username: req.body.username };
                        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

                        res.json({
                            msg: 'User authenticated successfully',
                            token: token
                        });
                    }
                    else res.status(401).json({ msg: "Password mismatch!" })
                });
            } else { res.status(404).json({ msg: "User not found!" }); }
        });

});

router.post('/addjob', (req, res) => {
    let newJob = new Job({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        area: req.body.area
    });
    if (!newJob.title || !newJob.description || !newJob.category || !newJob.area) {
        return res.status(400).json({ msg: 'Please include all fields' });
    }

    newJob
        .save()
        .then(res.json({ msg: `Job got posted: ${req.body.title}` }))
        .catch((err) => console.log(err));
});

module.exports = router;