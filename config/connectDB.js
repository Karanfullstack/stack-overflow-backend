const mongoose = require('mongoose');

const connectDB = function(){
  mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('DATABSE CONNECTED SUCCESSFULLY'.bgGreen.bold)
  }).catch((error)=>{
    console.log(err)
  })
}

module.exports = connectDB