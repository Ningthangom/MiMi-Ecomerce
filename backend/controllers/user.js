const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");

exports.userCart = async (req, res) => {
  console.log("this is req body inside userCart: ",req.body); // {cart: []}
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    // get price for creating total
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }

  // console.log('products', products)

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // console.log("cartTotal", cartTotal);


  // get address
  

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log("new cart", newCart);
  res.json({ ok: true });
};

//get cart
exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  console.log("empty cart");
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(cart);
};


exports.saveAddress = async (req, res) => {
    console.log("this is req body:", req.body)
    const userAddress = await User.findOneAndUpdate(
        { email: req.user.email },
        { shippingInfo: req.body.address}, { new: true}
      ).exec();
    
      res.json(userAddress);
}

exports.applyCouponToUserCart = async (req, res) => {
  console.log(`applyCoupontousercArt is called in user controller`, req.body)
  const { coupon } = req.body;
  console.log("COUPON", coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
   return  res.json({
      err: "Invalid coupon" })
  }
  
  console.log("VALID COUPON", validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();
  console.log("this is the user info: ", user)


  let { products, cartTotal } = 
    await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price")
    .exec();
 /*  let {cartTotal} = await Cart */

  console.log("cartTotal", cartTotal, "discount%", validCoupon.discount);

  // calculate the total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2); // 99.99

  Cart.findOneAndUpdate(
    { orderdBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).then((res) => {
    console.log("totalAfterDiscount was updated");
  })
  
  res.json(totalAfterDiscount);
  console.log("total after discount", totalAfterDiscount);
};


// order_status
exports.createOrder = async(req, res) => {
  console.log("reqbody in create order", req.body);
  const {paymentIntent} = req.body.stripeResponse;

  const user = await User.findOne({email: req.user.email}).exec();
  let {products} = await Cart.findOne({orderdBy: user._id}).exec();
  console.log("products: ", products);
  console.log("now creating new order")

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,

  }).save().catch((err) => {
    console.log("error in creating order: ", err)
  })
  
  console.log("New order has been saved", newOrder);
  res.json({ok: true})

}
