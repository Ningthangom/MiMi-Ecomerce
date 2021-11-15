const express = require('express');

const router = express.Router();


// import middlewares
const {authCheck} = require('../middlewares/auth')
const {adminCheck} = require('../middlewares/auth')

const {
    createOrUpdateUser, 
    currentUser,
} = require('../controllers/auth')

router.post('/create-or-update-user',authCheck, createOrUpdateUser)
router.post('/current-user',authCheck, currentUser)
// admin routes
// firstly authCheck will be run and get user data and send it to adminCheck
// if the role is admin then it will return currentUser if not return err
router.post('/current-admin',authCheck, adminCheck, currentUser);


module.exports = router;