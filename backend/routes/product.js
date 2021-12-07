const express = require("express");

const router = express.Router();

// import middlewares
const { authCheck } = require("../middlewares/auth");
const { adminCheck } = require("../middlewares/auth");

const {
  create,
  listAll,
  remove,
  read,
  update,
  sortedlist,
  totalProductCount,
  productRating,
  listRelated,
  searchFilter

} = require("../controllers/product");

// this route need to be before listAll route because program confues
// or change the route to total/count
router.get("/products/total", totalProductCount);
// data will be fetch only small amount at a time 
// to avoid app crush due to fetching large data
router.get("/products/:count", listAll);



// list product by sort such as new arrival or bestseller
router.post("/products", sortedlist);

router.get("/product/:slug", read);
router.post("/product", authCheck, adminCheck, create);
router.put("/product/:slug", authCheck, adminCheck, update);
router.delete("/product/:slug", authCheck, adminCheck, remove);

// rating:
router.put('/product/star/:productId', authCheck,productRating);

// related products
router.get('/product/related/:productId',listRelated);

//searching products
router.post('/search/filter', searchFilter)

module.exports = router;