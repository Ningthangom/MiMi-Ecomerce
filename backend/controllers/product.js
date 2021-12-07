

const Product = require('../models/product');
const User = require('../models/user')
const slugify = require('slugify')

exports.create = async (req, res) => {
        try {
            console.log("product create function is called ");
            console.log(req.body);
            req.body.slug = slugify(req.body.title);
            const {title} = req.body;
            const existingProduct = await Product.findOne({title : title})
            if(existingProduct){
                res.status(400).send("product already exists");
            } else{
                const product = await new Product(req.body).save();
                console.log("product was created successfully");
                res.json(product);
            }
           
        }catch(err) {
           res.send(err.message)
        }
}

// getting all products
exports.listAll = async (req, res) => {
    try {
        const productList = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate('category')
        .populate('subcategories')
        .sort({createdAt: -1}).exec();
        res.json(productList);  
    }catch(err) {
        res.status(400).send('getting list of product failed');
        console.log("error in getting list of products", err)
    }
}



exports.remove = async (req, res) => {
    console.log(req.params.slug)
   
    try {
         const deleted = await Product.findOneAndRemove({slug: req.params.slug});
        res.json(deleted);
        console.log("Product was deleted successfully")
    }catch(err){
        res.status(400).send('deleting Product failed')
        console.log("error in deleting Product", err);
    }
}


exports.read = async (req, res) => {

    try{ let proudct = await Product.findOne({slug: req.params.slug})
    .populate('category')
    .populate('subcategories')
    .exec();
     if(!proudct){
         res.json("proudct does not exist")
     }
     res.json(proudct);
     }catch(err){
         res.status(400).send('getting a proudct failed');
         console.log("error in getting a proudct", err);
     }
 
 }


 exports.update = async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updated = await Product.findOneAndUpdate(
        { slug: req.params.slug },
        req.body,
        { new: true }
      ).exec();
      res.json(updated);
    } catch (err) {
      console.log("PRODUCT UPDATE ERROR ----> ", err);
      // return res.status(400).send("Product update failed");
      res.status(400).json({
        err: err.message,
      });
    }
  };


  // list products by sort order
  
exports.sortedlist = async (req, res) => {
    console.table(req.body);
    try {
      // createdAt/updatedAt, desc/asc, 3
      const { sort, order, page } = req.body;
      const currentPage = page || 1;
      const itemsPerpage = 3;

      const products = await Product.find({})
        //skip for pagination
        .skip((currentPage - 1 ) * itemsPerpage)
        .populate("category")
        .populate("subcategories")
        .sort([[sort, order]])
        .limit(itemsPerpage)
        .exec();
  
      res.json(products);
    } catch (err) {
      console.log(err);
    }
  };

  // getting total product count    
  exports.totalProductCount = async (req, res) => {
      try{
        let total = await Product.find({}).estimatedDocumentCount().exec();
        res.json(total)
      }catch(err){
        console.log("error in getting totalproductcount: ", err)
      }
     
  }


  exports.productRating = async (req, res) => {
      const product = await Product.findById(req.params.productId).exec();
      const user = await User.findOne({email: req.user.email}).exec();
      const {star} = req.body;

      // check if current user has already rated the product 
      let currentRating = product.ratings.find(
        (rate) => rate.postedBy.toString() === user._id.toString()
      );

      if(currentRating){
        const updateRating = await Product.updateOne(
         { ratings: {$elemMatch : currentRating}},
         {$set: {"ratings.$.star": star}},
         {new: true}
        ).exec();
        console.log("rating updated successfully", updateRating)
        res.json(updateRating)
      }else {
        //push new rating and update product rating
        let createRating = await Product.findByIdAndUpdate(
          product._id,
          {$push: {ratings: {star, postedBy: user._id}}},
          {new: true}
        ).exec();
        console.log(`new rating created by ${user.name} : `,  createRating)
        res.json(createRating)
      }

  }

  exports.listRelated = async(req, res) => {
    console.log("listRelated is called")
    const product = await Product.findById(req.params.productId).exec();
    const relatedProducts = await Product.find({
      _id: {$ne: product._id},
      category: product.category,
    })
    .limit(3)
    .populate("category")
    .populate("subcategories")
    .populate({
      path: 'ratings',
      populate: 'postedBy',
    })
    .exec()

    res.json(relatedProducts);
  }


  // search and filter function 
  const handleQuery = async (req, res, query) => {
    /* console.log("this is textInput inside Hadlequery: ", query) */
    const products = await Product.find({
      // find by text, as text is set to true inside product model
      $or: [{title: {$regex: query, $options: 'i'}},{description: {$regex: query, $options: 'i'}} ]
    })
    .populate('category', '_id name')
    .populate('subcategories', '_id name')
    .populate('ratings', '_id postedBy')
    .exec();

    res.json(products)
   /*  console.log(products) */
  }

  const handlePrice = async (req, res, price) => {
    try {
      let products = await Product.find({
        price: {
          $gte: price[0],
          $lte: price[1],
        },
      })
      .populate('category', '_id name')
      .populate('subcategories', '_id name')
      .populate('ratings', '_id postedBy')
      .exec();
  
      res.json(products)
    } catch (err) {
      console.log(err);
    }
  };


  const handleCategory = async (req, res, category) => {
    try {
      let products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('subcategories', '_id name')
      .populate('ratings', '_id postedBy')
      .exec();
  
      res.json(products)
    } catch (err) {
      console.log(err);
    }
  };

  const handlecombineSearch = async (req, res, category, query, price) => {
    try {
      let products = await Product.find(
        { category, 
          price: {
            $gte: price[0],
            $lte: price[1],
          },
          $or: [
            {title:{$regex: query, $options: 'i'}},
            {description: {$regex: query, $options: 'i'}}
          ],
        
          })
      .populate('category', '_id name')
      .populate('subcategories', '_id name')
      .populate('ratings', '_id postedBy')
      .exec();
  
      res.json(products)
    } catch (err) {
      console.log(err);
    }
  };

  const handleStar = (req, res, stars) => {
    Product.aggregate([
      {
        $project: {
          document: "$$ROOT",
          // title: "$title",
          floorAverage: {
            $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
          },
        },
      },
      { $match: { floorAverage: stars } },
    ])
      .limit(12)
      .exec((err, aggregates) => {
        if (err) console.log("AGGREGATE ERROR", err);
        Product.find({ _id: aggregates })
        .populate('category', '_id name')
        .populate('subcategories', '_id name')
        .populate('ratings', '_id postedBy')
        .exec((err, products) => {
            if (err) console.log("PRODUCT AGGREGATE ERROR", err);
            res.json(products);
          });
      });
  };


  const handleSub = async (req, res, sub) => {
    const products = await Product.find({ subcategories: sub })
    .populate('category', '_id name')
    .populate('subcategories', '_id name')
    .populate('ratings', '_id postedBy')
      .exec();
  
    res.json(products);
  };
  
  const handleShipping = async (req, res, shipping) => {
    const products = await Product.find({ shipping })
    .populate('category', '_id name')
    .populate('subcategories', '_id name')
    .populate('ratings', '_id postedBy')
      .exec();
  
    res.json(products);
  };
  
  const handleColor = async (req, res, color) => {
    const products = await Product.find({ color })
    .populate('category', '_id name')
    .populate('subcategories', '_id name')
    .populate('ratings', '_id postedBy')
    .exec();
  
    res.json(products);
  };


  exports.searchFilter = async (req, res) => {
    const {query, price, category, stars, sub, shipping, color} = req.body;
    console.table(req.body)
  /*   console.log("this is textInput", req.body)
    console.log("this is detructured textInput", query) */

    if(query) {
      console.log("query", query)
      await handleQuery(req, res, query);
    }

    // price will be coming in an array, the min and max [20, 200]
  if (price !== undefined) {
    console.log("price ---> ", price);
    await handlePrice(req, res, price);
  }

  if (category) {
    console.log("category ---> ", category);
    await handleCategory(req, res, category);
  }
  
  if (stars) {
    console.log("stars ---> ", stars);
    await handleStar(req, res, stars);
  }
  
  if (sub) {
    console.log("sub ---> ", sub);
    await handleSub(req, res, sub);
  }
  if (shipping) {
    console.log("shipping ---> ", shipping);
    await handleShipping(req, res, shipping);
  }

  if (color) {
    console.log("color ---> ", color);
    await handleColor(req, res, color);
  }

  if ( category && query && price !== undefined) {
    console.log("combinesearch ---> ", category);    
    await handlecombineSearch(req, res, category);
  }
  }