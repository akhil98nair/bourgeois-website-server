const router = require('express').Router();
let Testimonail = require('../models/testimonial.model');

router.route('/').get((req, res) => {
    Testimonail.find()
        .then(testimonail => res.json(testimonail))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/').post((req, res) => {
    const comment = req.body.comment;
    const author = req.body.author;
    const organization = req.body.organization;
    const testimonailImage = req.body.testimonailImage;

    const newTestimonail = new Testimonail({comment,author,organization,testimonailImage});

    newTestimonail.save()
        .then(testimonail => res.json(testimonail))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').get((req, res) => {
    Testimonail.findById(req.params.id)
        .then(testimonail => res.json(testimonail))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').delete((req, res) => {
    Testimonail.findByIdAndDelete(req.params.id)
        .then(testimonail => res.json(testimonail))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').put((req, res) => {
    Testimonail.findById(req.params.id)
        .then(testimonail => {
            testimonail.comment = req.body.comment;
            testimonail.author = req.body.author;
            testimonail.organization = req.body.organization;
            testimonail.testimonailImage = req.body.testimonailImage;

            testimonail.save()
                .then(testimonail => res.json(testimonail))
                .catch(err => res.status(400).json({message: err.message}));
        })
        .catch(err => res.status(400).json({message: err.message}));
});

module.exports = router;