

const User = require('../models/user')

// create or update a user
exports.createOrUpdateUser = async (req, res) => {
    // accessing data from middlewares
    const {name, picture, email} = req.user;

    // check if the user exists
    // if not, then create 
    // else update 

    // find by email then update email and picture 
    // new will return the updated infos
    const user = await User.findOneAndUpdate(
        {email: email},
         {name:email.split('@')[0] , picture},
          {new: true}
          );

    if(user){
       /*  console.log("user updated", user) */
        //send new updated user
        res.json(user)
    }else{
        // create new user and save to the database
        const newUser = await new User({
            email, 
            name: email.split('@')[0], 
            picture, 
        }).save();
       /*  console.log("user created", newUser); */
        res.json(newUser)
    }

}

exports.currentUser = async (req, res) => {
    
    // find the current user by getting email from req.user
    // which was passed down from auth.js in middleware 
    // then return user data in json form if there is no error
    User.findOne({email: req.user.email})
    .exec((err, user) => {
        if(err) throw new Error(err);
        res.send(user)
       /*  res.send("user logged in successfully") */
    })

}