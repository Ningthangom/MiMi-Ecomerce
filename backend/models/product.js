const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');
const {ObjectId} = mongoose.Schema;


const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        minLength: 3,
        // text is for searching functional purposes
        text: true,

    },
    slug:{
        type: String,
        unique: true,
        lowercase: true,
        // index will allow us to query based on slug
        index: true,

    },
    description:{
        type: String,
        required: true,
        maxlength: 2000,
        // text is for searching functional purposes
        text: true,

    }, 
    price:{
        type: Number,
        required: true,
        trim: true,
        maxlength: 32,

    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    // subCategory will an array as there are more sub 
    // to be connected with
    subcategories:[ {
        type: ObjectId,
        ref: "Subcategory"
    }],
    quantity: {
        type: Number,

    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,

    },
    shipping: {
        type: String,
        // enum will set the values to choose from
        enum:["Yes", "No"]
    },
    measurement: {
        type: String,
        enum: ["kg","liter","bag","item","bottle","other"]
    },
    color: {
        type: String,
        enum: ["Yellow", "Red", "Brown", "Silver", "White", "Blue", "Black", "others"]
    },
    brand: {
        type: String,
        maxlength: 100
    },
    ratings:[ {
        star: Number,
        postedBy: {
            type: ObjectId,
            ref: "User"
        }
    }]

}, {timestamps: true});

productSchema.plugin(mongoose_delete, { deletedAt : true });
module.exports = mongoose.model("Product", productSchema);