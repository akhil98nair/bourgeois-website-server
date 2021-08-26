const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: {type: String},
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    gradientColor: { type: String, required: true },
    imageLink: { type: String, required: true },
    videoLink: { type: String, required: true },
    sectionQuote: { type: String, required: true },
    sectionTitle: { type: String, required: true },
    sectionDescription: { type: String, required: true },
    projects: { type: Array, required: true },
},{
    timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;