const router = require('express').Router();
let Project = require('../models/project.model');
let Category = require('../models/category.model');

router.route('/').get(async(req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

router.route('/').post(async(req, res) => {
    const _id = req.body._id;
    const projectImageLink = req.body.projectImageLink;
    const projectDescription = req.body.projectDescription;
    const tags = req.body.tags;
    const client = req.body.client;
    const industry = req.body.industry;
    const year = req.body.year;
    const headSectionColor = req.body.headSectionColor;
    const headFontColor = req.body.headFontColor;
    const headSecondaryFontColor = req.body.headSecondaryFontColor;
    const bodySectionColor = req.body.bodySectionColor;
    const bodyTitleColor = req.body.bodyTitleColor;
    const bodyFontColor = req.body.bodyFontColor;
    const components = req.body.components;

    const newProject = new Project({_id,projectImageLink,projectDescription,tags,client,industry,year,headSectionColor,headFontColor,headSecondaryFontColor,bodySectionColor,bodyTitleColor,bodyFontColor,components});

    const project = await newProject.save();
    project.tags.forEach(async(item) => {
        var category = await Category.findById(item.id);
        category.projects.push({
            id : project.id,
            projectTitle : project.id,
            projectImageLink : project.projectImageLink,
            client : project.client,
            industry : project.industry,
            year : project.year
        })

        await category.save() 
    })

    const project2 = await project.save();
    res.json(project2);
});

router.route('/:id').get(async(req, res) => {
    const project = await Project.findById(req.params.id);
    res.json(project);
});

router.route('/:id').delete(async(req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);
    project.tags.forEach(async(item)=> {
        var category = await Category.findById(item.id);
        category.projects.splice(category.projects.findIndex(a => a.id === project.id) , 1)
        await category.save();
    })
    res.json(project)
});

router.route('/:id').put(async(req, res) => {
    const project = await Project.findById(req.params.id);
    project._id = req.body._id;
    project.projectImageLink = req.body.projectImageLink;
    project.projectDescription = req.body.projectDescription;
    project.client = req.body.client;
    project.industry = req.body.industry;
    project.year = req.body.year;
    project.headSectionColor = req.body.headSectionColor;
    project.headFontColor = req.body.headFontColor;
    project.headSecondaryFontColor = req.body.headSecondaryFontColor;
    project.bodySectionColor = req.body.bodySectionColor;
    project.bodyTitleColor = req.body.bodyTitleColor;
    project.bodyFontColor = req.body.bodyFontColor;
    project.components = req.body.components;
    
    project.tags.forEach(async(item)=> {
        var category = await Category.findById(item.id);
        category.projects.splice(category.projects.findIndex(a => a.id === project._id) , 1)
        await category.save();
    })

    project.tags = req.body.tags;

    project.tags.forEach(async(item) => {
        var category = await Category.findById(item.id);
        category.projects.push({
            id : project._id,
            projectTitle : project._id,
            projectImageLink : project.projectImageLink,
            client : project.client,
            industry : project.industry,
            year : project.year
        })

        category.save() 
    })

    const project2 = await project.save();
    res.json(project2);
});

module.exports = router;