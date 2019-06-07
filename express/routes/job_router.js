let express = require('express');
let router = express.Router();
let Category = require('../models/category');
let Area = require('../models/area');
let Job = require('../models/job');

/****** Routes *****/

// GET
router.get('/categories', (req, res) => {
    Category.find({}, (err, data) => {
        res.json(data);
    }).sort({name: 1})
});

router.get('/jobs', (req, res) => {
    Job.find()
        .populate('category area', 'name')
        .exec((err, data) => {
            res.json(data);
        })
});

router.get('/areas', (req, res) => {
    Area.find()
        .populate({path: 'jobs',
            populate: {path: 'category', select: 'name'},
            select: 'title'
        })
        .exec((err, data) => {
            res.json(data);
        })
});

router.get('/jobs/:category/:area', (req, res) => {
    Job.find({category: req.params.category, area: req.params.category.area}, (err, data) => {
        res.json(data);
    })
});

module.exports = router;