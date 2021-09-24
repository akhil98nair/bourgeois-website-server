const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    _id: {type: String},
    projectTitle: { type: String, required: true },
    projectImageLink: { type: String, required: true },
    projectDescription: { type: String, required: true },
    tags: { type: Array, required: true },
    client: { type: String, required: true },
    industry: { type: String, required: true },
    year: { type: String, required: true },
    headSectionColor: { type: String, required: true },
    headFontColor: { type: String, required: true },
    headSecondaryFontColor: { type: String, required: true },
    bodySectionColor: { type: String, required: true },
    bodyTitleColor: { type: String, required: true },
    bodyFontColor: { type: String, required: true },
    components: { type: Array, required: true },
},{
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;