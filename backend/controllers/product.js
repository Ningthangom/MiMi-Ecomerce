

const Product = require('../models/product');
const slugify = require('slugify')

exports.create = async (req, res) => {
        try {
     
            console.log(req.body);
            req.body.slug = slugify(req.body.title);
            const {title} = req.body;
            const existingProduct = await Product.findOne({title : title})
            if(existingProduct){
                res.status(400).send("product already exists");
            } else{
                const product = await new Product(req.body).save();
                res.json(product);
            }
           
        }catch(err) {
           res.send(err.message)
        }
}

// getting all products
exports.list = async (req, res) => {
    try {
        const productList = await Product.find({}).sort({createdAt: -1}).exec();
        res.json(productList);  
    }catch(err) {
        res.status(400).send('getting list of product failed');
        console.log("error in getting list of products", err)
    }
}