const express = require("express");

const router = express.Router();

const {
   testing
} = require('../controllers/test')


router.get("/testing", testing);

module.exports = router;
