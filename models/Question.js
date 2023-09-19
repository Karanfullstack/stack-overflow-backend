const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  text:{
    type:String,
    required:true
  },
  name:{
    type:String,
  },
  upvotes:[
    {
      user:{
      type:Schema.Types.ObjectId,
      ref:"User"
      }
    }
  ],

  answers:[
    {
      user:{
      type:Schema.Types.ObjectId,
      ref:"User"
      },
      text:{
        type:String,
        required:true
      },
      name:{
        type:String,
      },
      date:{
        type:Date,
        default:Date.now
      }
    }
  ],
  date:{
    type:Date,
    default:Date.now
  }
});


const Question = mongoose.model('Question', questionSchema);

module.exports = Question