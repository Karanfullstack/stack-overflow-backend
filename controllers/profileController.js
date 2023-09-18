const Profile = require('../models/Profile')

const profileController = {

// GET PROFILE CONTROLLER - /profile
   async getProfile(req, res){
     // chekc if user has profile 
     try {
       const profile = await Profile.findOne({user:req.user._id})
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
   }
}

module.exports = profileController