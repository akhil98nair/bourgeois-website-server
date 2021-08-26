const router = require('express').Router();
let Category = require('../models/category.model');
let Project = require('../models/project.model');

router.route('/').get((req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/').post((req, res) => {
    const _id = req.body._id;
    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const gradientColor = req.body.gradientColor;
    const imageLink = req.body.imageLink;
    const videoLink = req.body.videoLink;
    const sectionQuote = req.body.sectionQuote;
    const sectionTitle = req.body.sectionTitle;
    const sectionDescription = req.body.sectionDescription;
    const projects = req.body.projects;

    const newCategory = new Category({_id,title,subTitle,gradientColor,imageLink,videoLink,sectionQuote,sectionTitle,sectionDescription,projects});

    newCategory.save()
        .then((category) => res.json(category))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').get((req, res) => {
    Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then((category) => {
            category.projects.forEach(async(item)=> {
                var project = await Project.findById(item.id);
                project.tags.splice(project.tags.findIndex(a => a.id === category.id), 1)
                await project.save();
            })
            res.json(category)
        })
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').put((req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            category._id = req.body._id;
            category.title = req.body.title;
            category.subTitle = req.body.subTitle;
            category.gradientColor = req.body.gradientColor;
            category.imageLink = req.body.imageLink;
            category.videoLink = req.body.videoLink;
            category.sectionQuote = req.body.sectionQuote;
            category.sectionTitle = req.body.sectionTitle;
            category.sectionDescription = req.body.sectionDescription;
            category.projects = req.body.projects;

            category.save()
                .then((category) => res.json(category))
                .catch(err => res.status(400).json({message: err.message}));
        })
        .catch(err => res.status(400).json({message: err.message}));
});

module.exports = router;