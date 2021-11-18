
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');


// fs(file system) will give access to file system 
// core node module of node
const {readdirSync} = require('fs');

require('dotenv').config();


//import routes

// app
const app = express();

//db
mongoose.connect(process.env.DATABASE)
.then(() => {
    console.log("mongo connection successful......")
})
.catch(err => {
    console.log("Mongo connection err: ", err)
})


// middlewares
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
/* app.use(express.urlencoded({limit: '50mb'})); */
app.use(cors());


//routes middle
// this will read routes folder and automatically imports all the routes
readdirSync('./routes').map((route)=>app.use("/api",require('./routes/' + route)))

// port 
const port =  process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on ${port}...`))
