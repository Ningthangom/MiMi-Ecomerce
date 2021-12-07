
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true
    },
    role: {
        type: String,
        default: 'customer'
    },
    cart: {
        type: Array,
        default:[]
    },
    shippingInfo: {
        address: {
            type: String,
           /*  required: true */
        },
        city: {
            type: String,
          /*   required: true */
        },
        phoneNo: {
            type: String,
          /*   required: true */
        },
        postalCode: {
            type: String,
           /*  required: true */
        },
        country: {
            type: String,
           /*  required: true */
        },
    },
   /*  wishlist: [
        { 
            type: ObjectId,
            ref: "Product"
        }
    ] */
    

}, {timestamps: true});

module.exports =  mongoose.model('User', userSchema);