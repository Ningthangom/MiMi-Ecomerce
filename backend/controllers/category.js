
const Category = require('../models/category');
const Product = require('../models/product');
const Sub = require('../models/subcategory');
const slugify = require('slugify')

exports.create = async (req, res) => {

        try {
            const {name} = req.body;
            const existingCategory = await Category.findOne({name: name});
            if(existingCategory) {  
                res.status(400).send("category already exists");

            }else{
                const category = await new Category({name, slug: slugify(name)}).save();
                res.send("category was successfully created");
            }
        }catch(err) {
            if(res.status(401)){
                res.status("Please login again and try again");
            }
            res.status(400).send('creating category failed')
            console.log("error in creating category", err)
        }
}

exports.update = async (req,res) => {
    const {name} = req.body;
    console.log("update category is called", name)
    try{
        
        const updatedCategory = await Category.findOneAndUpdate(
            {
                slug: req.params.slug},
                {name, slug: slugify(name)},
                 {new: true
            }
            );
        res.json(updatedCategory)
    }catch(err) {
        res.status(400).send('updating category failed')
            console.log("error in updating category", err)
        
    }
}

exports.remove = async (req, res) => {
    console.log(req.params.slug)
   
    try {
         const deleted = await Category.findOneAndRemove({slug: req.params.slug});
        res.json(deleted);
        console.log("category was deleted successfully")
    }catch(err){
        res.status(400).send('deleting category failed')
        console.log("error in deleting category", err);
    }
}

exports.read = async (req, res) => {

   try{ let category = await Category.findOne({slug: req.params.slug}).exec();
    if(!category){
        res.json("category does not exist")
    }
    const products = await Product.find({ category }).populate("category").exec();
    res.json({
        category,
         products});

    }catch(err){
        res.status(400).send('getting a category failed');
        console.log("error in getting a category", err);
    }

}
exports.list = async (req, res) => {

    try {
        const categoryList = await Category.find({}).sort({createdAt: -1}).exec();
        res.json(categoryList);  
    }catch(err) {
        res.status(400).send('getting list of category failed');
        console.log("error in getting list of categories", err)
    }
}

exports.getsubcategories = async (req, res) => {
    try{
        const subcategories = await Sub.find({parent: req.params._id}).exec();
        res.json(subcategories)      
    }catch(err){
            res.status(400).send("error in getting subcategories related to parent category")
    }
}