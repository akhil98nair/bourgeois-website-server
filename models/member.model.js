const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    imageLink: { type: String, required: true },
},{
    timestamps: true,
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;