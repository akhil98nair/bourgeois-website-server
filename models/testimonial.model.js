const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    comment: { type: String, required: true },
    author: { type: String, required: true },
    organization: { type: String, required: true },
    testimonailImage: { type: String, required: true },
},{
    timestamps: true,
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;