const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proifleSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },

  username:{
    type:String,
    required:true,
    maxlength:[12, 'Max length of username is 12']
  },
  website:{
    type:String,
  },

  country:{
    type:String,
  },

  languages:{
    type:[String],
    required:true
  },
  portfolio:{
    type:String,
    required:true
  },

  socials:{
    youtube:{
      type:String,
    },
     facebook:{
      type:String,
    }
  },
 
 workrole:[
   {
    role:{
      type:String,
      required:true
    },
    compnay:{
      type:String,
    },
    country:{
      type:String,
    },
    from:{
      type:Date,
    },
    to:{
      type:Date,
    },
    current:{
      type:Boolean,
      default:false
    },
    details:{
      type:String,
    }
   }
 ],
 date:{
  type:Date,
  default:Date.now
 }
})

const Profile = mongoose.model('Profile',proifleSchema);

module.exports = Profile