const router = require('express').Router();
let Partner = require('../models/partner.model');

router.route('/').get((req, res) => {
    Partner.find()
        .then(partner => res.json(partner))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/').post((req, res) => {
    const partnerName = req.body.partnerName;
    const imageLink = req.body.imageLink;

    const newPartner = new Partner({partnerName,imageLink});

    newPartner.save()
        .then(partner => res.json(partner))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').get((req, res) => {
    Partner.findById(req.params.id)
        .then(partner => res.json(partner))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').delete((req, res) => {
    Partner.findByIdAndDelete(req.params.id)
        .then(partner => res.json(partner))
        .catch(err => res.status(400).json({message: err.message}));
});

router.route('/:id').put((req, res) => {
    Partner.findById(req.params.id)
        .then(partner => {
            partner.partnerName = req.body.partnerName;
            partner.imageLink = req.body.imageLink;

            partner.save()
                .then(partner => res.json(partner))
                .catch(err => res.status(400).json({message: err.message}));
        })
        .catch(err => res.status(400).json({message: err.message}));
});

module.exports = router;