const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const colors = require('colors')

const app = express()
// middleware
app.use(express.json());

// CONFIG
dotenv.config()
// DATABSE CONNECTION
connectDB()
// Routes Imports
const AuthRoutes = require('./routes/Auth');
app.use('/api/v1', AuthRoutes)

// SERVER CONNECTION
app.listen(process.env.PORT,()=> console.log('SERVER CONNECTED'.bgBlue.bold))