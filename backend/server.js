
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const Order = require('./models/order')



// fs(file system) will give access to file system 
// core node module of node
const {readdirSync} = require('fs');

require('dotenv').config();


//import routes

// app
const app = express();





// middlewares
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
/* app.use(express.urlencoded({limit: '50mb'})); */
app.use(cors());




// soket connector 
const {Server} = require("socket.io");
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET","POST","PUT"]
    }
})




//db
mongoose.connect(process.env.DATABASE)
.then(() => {
    console.log("mongo connection successful......")

    io.on("connection", (socket) => {
        console.log("socket id: " + socket.id + " is connected")
    
       
    
    /*     Order.watch().on("OrderChange", (neworder) => {
            console.log("new order has been placed: socket server")
            io.to(neworder.fullDocument._id).emit("OrderChange",neworder.fullDocument)
        }) */

       /*  sendStatus = function (s){
            io.emit('status', s)
        }

        Order.find().limit(3).sort({createdAt: -1}).toArray(function (err, res) {
            if(err) {
                throw err;
            }
            io.emit("neworders", res)
        }) */

        socket.on("newOrderAlert", (payload) => {
            console.log("new order in socket", payload);
            io.emit("newOrderAlert", payload)
            console.log("send data to the front: ")
            
        })
    
        
    
        socket.on("disconnect", () => {
            console.log("user" + socket.id + " is disconnected")
        })
    })

})
.catch(err => {
    console.log("Mongo connection err: ", err)
})



//routes middle
// this will read routes folder and automatically imports all the routes
readdirSync('./routes').map((route)=>app.use("/api",require('./routes/' + route)))

// port 
const port =  process.env.PORT || 8000;

// without socket
/* port.listen(port, () => console.log(`Server is running on ${port}...`)) */


// with socket 
server.listen(port, () => console.log(`socket Server is running on ${port}...`))
