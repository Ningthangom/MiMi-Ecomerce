const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orderList,
  addToWhishList,
  wishlist,
  removeFromWishlist,
  createCashOrder,
  createPickupOrder
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); // empty cart
router.post("/user/address", authCheck, saveAddress);

// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);


// orders 
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck,orderList);
router.post("/user/cash-order", authCheck, createCashOrder); // cod
router.post("/user/pickup-order", authCheck, createPickupOrder);


// wishList 
router.post("/user/wishlist", authCheck, addToWhishList);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);


router.get("/user/testing", (req, res, next) => {
  res.json({msg: "hello"})
})



module.exports = router;
