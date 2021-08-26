const router = require('express').Router();
let Testimonail = require('../models/testimonial.model');

router.route('/').get(async(req, res) => {
    const testimonail = await Testimonail.find();
    res.json(testimonail);
});

router.route('/').post(async(req, res) => {
    const comment = req.body.comment;
    const author = req.body.author;
    const organization = req.body.organization;
    const testimonailImage = req.body.testimonailImage;

    const newTestimonail = new Testimonail({comment,author,organization,testimonailImage});

    const testimonail = await newTestimonail.save();
    res.json(testimonail);
});

router.route('/:id').get(async(req, res) => {
    const testimonail = await Testimonail.findById(req.params.id)
    res.json(testimonail);
});

router.route('/:id').delete(async(req, res) => {
    const testimonail = await Testimonail.findByIdAndDelete(req.params.id)
    res.json(testimonail);
});

router.route('/:id').put(async(req, res) => {
    const testimonail = await Testimonail.findById(req.params.id)
    testimonail.comment = req.body.comment;
    testimonail.author = req.body.author;
    testimonail.organization = req.body.organization;
    testimonail.testimonailImage = req.body.testimonailImage;

    const testimonail2 = await testimonail.save();
    res.json(testimonail2);
});

module.exports = router;