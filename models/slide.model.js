const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const slideSchema = new Schema({
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    textColor: { type: String, required: true },
    slideImage: { type: String, required: true },
},{
    timestamps: true,
});

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;