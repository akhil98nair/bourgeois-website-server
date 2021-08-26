const router = require('express').Router();
let Slide = require('../models/slide.model');

router.route('/').get((req, res) => {
    Slide.find()
        .then(slides => res.json(slides))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/').post((req, res) => {
    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const textColor = req.body.textColor;
    const slideImage = req.body.slideImage;

    const newSlide = new Slide({title,subTitle,textColor,slideImage});

    newSlide.save()
        .then(slide => res.json(slide))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').get((req, res) => {
    Slide.findById(req.params.id)
        .then(slide => res.json(slide))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').delete((req, res) => {
    Slide.findByIdAndDelete(req.params.id)
        .then(slide => res.json(slide))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').put((req, res) => {
    Slide.findById(req.params.id)
        .then(slide => {
            slide.title = req.body.title;
            slide.subTitle = req.body.subTitle;
            slide.textColor = req.body.textColor;
            slide.slideImage = req.body.slideImage;

            slide.save()
                .then(slide => res.json(slide))
                .catch(err => res.status(400).json({message: err.message}));
        })
        .catch(err => res.status(400).json({message: err.message}));
});

module.exports = router;