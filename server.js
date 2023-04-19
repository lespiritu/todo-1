const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const port = 3004;

const app = express();



// =================== imported routes ====================
const userRoutes = require('./Routes/userRoutes.js');
const todoRoutes = require('./Routes/todoRoutes.js')



// [Mongoose] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back [solved]
mongoose.set('strictQuery', true);

//connecting to the database [MongoDB]
mongoose.connect(`${process.env.MONGODB_STRING}`, 
    {
        useNewUrlParser:true,
        useUnifiedTopology: true
    }
);

let db = mongoose.connection;
// connecting error
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", ()=>console.log(`We're connected to the database cloud!`));


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());



// request routes
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);



app.listen(port, ()=> console.log(`Server is running at port: ${port}`))
