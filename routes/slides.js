const router = require('express').Router();
let Slide = require('../models/slide.model');

router.route('/').get(async(req, res) => {
    const slides = await Slide.find();
    res.json(slides);
});

router.route('/').post(async(req, res) => {
    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const textColor = req.body.textColor;
    const slideImage = req.body.slideImage;

    const newSlide = new Slide({title,subTitle,textColor,slideImage});

    const slide = await newSlide.save();
    res.json(slide);
});

router.route('/:id').get(async(req, res) => {
    const slide = await Slide.findById(req.params.id);
    res.json(slide);
});

router.route('/:id').delete(async(req, res) => {
    const slide = await Slide.findByIdAndDelete(req.params.id);
    res.json(slide);
});

router.route('/:id').put(async(req, res) => {
    const slide = await Slide.findById(req.params.id);
    slide.title = req.body.title;
    slide.subTitle = req.body.subTitle;
    slide.textColor = req.body.textColor;
    slide.slideImage = req.body.slideImage;

    const slide2 = await slide.save();
    res.json(slide);
});

module.exports = router;