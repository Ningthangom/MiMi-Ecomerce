


const admin = require('../firebase/index');
const User = require('../models/user')

// next parameter is important in middle wares

exports.authCheck = async (req, res, next) => {
  /*   console.log(res) */
   try{
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
   /*  console.log("user auth check successful: ", firebaseUser); */

    //passing token to user controllers
    req.user = firebaseUser;
   /*  console.log("user info: ", req.user); */
     
    next();
   }catch(err){
       res.status(401).json({
           message:"Please log out and login again"})
       /* console.log("error checking token") */
   }
   
}


exports.adminCheck = async (req, res, next) => {

    const {email} = req.user;
    /* console.log(email) */
    const adminUser = await User.findOne({email}).exec();
   
    if (adminUser.role !== 'admin') {

        res.status(403).json({
            err: 'you are not allowed to access'
        })
    }else{
        next();
    }

}