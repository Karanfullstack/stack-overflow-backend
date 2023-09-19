const Profile = require('../models/Profile')
const User = require('../models/User')
const profileController = {

// GET PROFILE CONTROLLER - /profile
   async getProfile(req, res){
     // chekc if user has profile 
     try {
       const profile = await Profile.findOne({user:req.user._id}).populate('user',["profilepic","name"])
       if(!profile){
         return res.status(404).json({success:false, message:"You dont' have Profile"})
       }
       res.status(201).json(profile)
     } catch (error) {
       res.status(400).json(error)
     }
   },

   // UPDATE AND CREATE PROFILE

   async createAndUpdateProfile(req, res){
     const profileValues = {};
     profileValues.user = req.user._id;
     if(req.body.username) profileValues.username = req.body.username
     if(req.body.website) profileValues.website = req.body.website
     if(req.body.country) profileValues.country = req.body.country
     if(req.body.portfolio) profileValues.portfolio = req.body.portfolio
     if(req.body.languages !== undefined){
      profileValues.languages = req.body.languages.split(",")
     }

     // setting soicals values
     profileValues.socials = {};
     if(req.body.youtube) profileValues.socials.youtube = req.body.youtube
     if(req.body.facebook) profileValues.socials.facebook = req.body.facebook
     // end socials values
  
const profile = await Profile.findOne({user:req.user._id});
if(profile){
  const checkuser = await Profile.findOne({username:profileValues.username});
  if(checkuser && checkuser.username !== profile.username){
    return res.json('username is already taken')
  }
}
    // Updating profile
    Profile.findOne({user:req.user._id}).then((profile)=>{
       if(profile){
        Profile.findOneAndUpdate({user:req.user._id},{$set:profileValues},{new:true}).then((profile)=>{
          res.status(201).json(profile)
        }).catch((error)=> console.log(error))
       } else{
          Profile.findOne({username:profileValues.username}).then((profile)=>{
             if(profile){
              return res.status(201).json({success:false, message:`This ${profile.username} is already taken`})
             }
             // save user
             new Profile(profileValues).save().then((profile)=>{
              res.status(201).json(profile)
             }).catch((error)=> console.log(error))
          })
       }
    }).catch((error)=> console.log(error))
   },

   // GET PROFILE BY USERNAME IN URL

   async getProfileByUserName(req, res){
      const {username} = req.params;
      try {
        const profile = await Profile.findOne({username}).populate('user',["name","profilepic"]);
      if(!profile){
        return res.status(400).json({message:`No profile found with this ${username}`})
      }
      res.status(201).json(profile)
      } catch (error) {
          console.log(error)
      } 
   },


   // GET PROFILE BY URL

  async getProfileByUrl(req, res){
      try {
        const profile = await Profile.findById(req.params.id).populate("user",["name","profilepic"])
        if(!profile){
          return res.status(400).json({success:false, message:"No Profile Found"})
        }
        res.status(201).json({success:true, profile})
      } catch (error) {
        console.log(error)
        res.status(400).json({message:"Argument passed in must be a string of 24"})
      } 
  },

  // GETTING ALL PROFILE 
  async getProfileAll(req, res){
    try {
      const profile = await Profile.find();
      if(!profile){
        return res.json({success:false, message:"Proilfe Model is empty"})
      }
      res.status(201).json({success:true, length:profile.length, profile})
    } catch (error) {
      console.log(error)
    }
  },

  // DELETING UESER AND ITS PROFILE 
  async deleteProfile(req, res){
   
    try {
       const profile = await Profile.findOne({user:req.user._id});
    if(profile){
      await Profile.findOneAndRemove({_id:profile._id});
      await User.findByIdAndRemove({_id:req.user._id});
      res.json({success:true, message:"DELETED SUCCESS"})
    }
    } catch (error) {
      console.log(error)
    }
 
}

}

module.exports = profileController