const router = require('express').Router();
let Home = require('../models/home.model');

router.route('/').get((req, res) => {
    Home.find()
        .then(home => res.json(home))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').get((req, res) => {
    Home.findById(req.params.id)
        .then(home => res.json(home))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').put((req, res) => {
    Home.findById(req.params.id)
        .then(home => {
            home._id = req.body._id;
            home.videoLink = req.body.videoLink;

            home.save()
                .then(home => res.json(home))
                .catch(err => res.status(400).json({message: err.message}));
        })
        .catch(err => res.status(400).json({message: err.message}));
});

module.exports = router;