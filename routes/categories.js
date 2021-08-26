const router = require('express').Router();
let Category = require('../models/category.model');
let Project = require('../models/project.model');

router.route('/').get(async(req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

router.route('/').post(async(req, res) => {
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

    const category = await newCategory.save();
    res.json(category);
});

router.route('/:id').get(async(req, res) => {
    const category = Category.findById(req.params.id);
    res.json(category);
});

router.route('/:id').delete(async(req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    category.projects.forEach(async(item)=> {
        var project = await Project.findById(item.id);
        project.tags.splice(project.tags.findIndex(a => a.id === category.id), 1)
        await project.save();
    })
    res.json(category);
});

router.route('/:id').put(async(req, res) => {
    const category = await Category.findById(req.params.id);
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

    const category2 = await category.save();
    res.json(category2);
});

module.exports = router;