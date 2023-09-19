const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const colors = require('colors')
const passport = require('passport');

const app = express()
// middleware
app.use(express.json());

// CONFIG
dotenv.config()

// DATABSE CONNECTION
connectDB()

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
// IMPORT STRATEGY
require('./strategy/Strategy')(passport)

// IMPORT ROUTES
const AuthRoutes = require('./routes/Auth');
const ProfileRoutes = require('./routes/Profile')
const Question = require('./routes/Question')
app.use('/api/v1', AuthRoutes)
app.use('/api/v1', ProfileRoutes)
app.use("/api/v1", Question)

// SERVER CONNECTION
app.listen(process.env.PORT,()=> console.log('SERVER CONNECTED'.bgBlue.bold))