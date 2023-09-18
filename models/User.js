const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmial} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name:{
    type:String,
    required:true,
    maxlength:[15, 'Max Length Must Be 15'],
    minlength:[4, 'Min Length Must Be 4']
  },
  email:{
    type:String,
    required:[true, 'Please enter an email'],
    unique:true,
    lowercase:true
  },
  password:{
    type:String,
    required:[true, 'Please enter a password'],
    minlength:[5, 'Minimum password length is 6 characters']
  },
  profilepic:{
    type:String,
    default:"https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg"
  },
  gender:{
    type:String,
    required:[true, 'Please Enter Gender Type']
  },
  date:{
    type:Date,
    default:Date.now
  }
})

// fire a function before document save
userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt()
 this.password = await bcrypt.hash(this.password, salt)
 next()
})
const User = mongoose.model('User', userSchema )
module.exports = User