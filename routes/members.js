const router = require('express').Router();
let Member = require('../models/member.model');

router.route('/').get((req, res) => {
    Member.find()
        .then(members => res.json(members))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/').post((req, res) => {
    const name = req.body.name;
    const designation = req.body.designation;
    const imageLink = req.body.imageLink;

    const newMember = new Member({name,designation,imageLink});

    newMember.save()
        .then(member => res.json(member))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').get((req, res) => {
    Member.findById(req.params.id)
        .then(member => res.json(member))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').delete((req, res) => {
    Member.findByIdAndDelete(req.params.id)
        .then(member => res.json(member))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').put((req, res) => {
    Member.findById(req.params.id)
        .then(member => {
            member.name = req.body.name;
            member.designation = req.body.designation;
            member.imageLink = req.body.imageLink;

            member.save()
                .then(member => res.json(member))
                .catch(err => res.status(400).json({message: err.message}));
        })
        .catch(err => res.status(400).json({message: err.message}));
});

module.exports = router;