
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: "category name is required",
        // minimum length should be 3 Characters
        // if not return 'too short'
        minlength:[3, 'too short'],
        maxlength: [32, 'too long']
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
    }

}, {timestamps: true});

module.exports =  mongoose.model('Category', categorySchema);