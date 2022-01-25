const express = require('express');
const connectDB = require('./config/dbConnect');
const authRoutes = require('./routes/auth');
const cors= require('cors');
const userVerified = require('./verifytoken') 
require('dotenv').config();
require('./config/dbConnect');

const app = express();
app.use(cors());
app.use(express.json());

//app.use(userVerified());
app.use('/api/v1/user', authRoutes);

const port = 3050;
const start = async () =>{
    try {
        await connectDB(process.env.DB_CONNECT);
        app.listen(port, ()=>{console.log(`Server is running on port ${port}`)});
    } catch (error) {
        console.log(error);
    };
};

start();
