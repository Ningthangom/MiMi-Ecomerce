const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
/* const Stripe = require("stripe") */

exports.createPaymentIntent = async (req, res) => {
  // later apply coupon
  // later calculate price
    console.log("createPaymentIntent is called", req.body )
    const {couponApplied} = req.body;
    
  // find user 
  const user = await User.findOne({email: req.user.email}).exec();
  //cart total is 
  const {cartTotal, totalAfterDiscount} = await Cart.findOne({orderdBy: user._id}).exec();

  console.log("cartTotal: ", cartTotal, "totalAfterDiscount", totalAfterDiscount);
  
  let finalAmount = 0;
  if(couponApplied && totalAfterDiscount) {
      finalAmount = Math.round(totalAfterDiscount * 100);
      console.log("show finalAmount with coupon",finalAmount )
  }else{
      finalAmount = Math.round(cartTotal * 100);
  }
  const paymentIntent = await stripe.paymentIntents.create({
    //make sure to send this in cents 
    amount: finalAmount,
    currency: "aud",
  })

  console.log("createPaymentIntent is called: ", paymentIntent);
  const clientsecret = paymentIntent.client_secret;
  res.send({
    clientSecret:clientsecret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
 
};
