const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partnerSchema = new Schema({
    partnerName: { type: String, required: true },
    imageLink: { type: String, required: true },
},{
    timestamps: true,
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;