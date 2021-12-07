
const subCategory = require('../models/subcategory');
const Product = require('../models/product')
const slugify = require('slugify')

exports.create = async (req, res) => {

        try {
            const {name, parent} = req.body;
            const existingCategory = await subCategory.findOne({name: name});
            if(existingCategory) {  
                res.status(400).send("category already exists");

            }else{
                 await new subCategory({name,parent, slug: slugify(name)}).save();
                res.send("category was successfully created");
            }
        }catch(err) {
            res.status(400).send('creating subCategory failed')
            console.log("error in creating subCategory", err)
        }
}

exports.update = async (req,res) => {
    const {name, parent} = req.body;
    console.log("update subCategory is called", name)
    try{
        
        const updatedsubCategory= await subCategory.findOneAndUpdate(
            {slug: req.params.slug},
            {name,parent,slug: slugify(name)},
            {new: true}
            );
        res.json(updatedsubCategory)
    }catch(err) {
        res.status(400).send('updating subCategory failed')
            console.log("error in updating subCategory", err)
        
    }
}

exports.remove = async (req, res) => {
    console.log(req.params.slug)
   
    try {
         const deleted = await subCategory.findOneAndRemove({slug: req.params.slug});
        res.json(deleted);
        console.log("subCategory was deleted successfully")
    }catch(err){
        res.status(400).send('deleting subCategory failed')
        console.log("error in deleting subCategory", err);
    }
}

exports.read = async (req, res) => {

   try{ let subcategory = await subCategory.findOne({slug: req.params.slug}).exec();
        const products = await Product.find({subcategories: subcategory})
                                            .populate("category")
                                            .exec();
    if(!subcategory){
        res.json("subCategory does not exist")
    }
    res.json({subcategory, products});
    }catch(err){
        res.status(400).send('getting a subCategory failed');
        console.log("error in getting a subCategory", err);
    }

}
exports.list = async (req, res) => {

    try {
        const categoryList = await subCategory.find({}).populate('parent').sort({createdAt: -1}).exec();
        res.json(categoryList);  
    }catch(err) {
        res.status(400).send('getting list of subCategory failed');
        console.log("error in getting list of subCategory", err)
    }
}