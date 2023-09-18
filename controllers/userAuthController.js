const User = require('../models/User');
const errorHandler = require('../services/errorHandler');
const { createToken } = require('../services/jwtService');
const userController = {

  // Register Controller
  async register(req, res){
  const {name, email, password, gender} = req.body

  const customProfile = {
    male:"http://malephoto.jpt",
    female:"http://female-photo.jpg"
  }
  try {
    const user = new User({
      name,
      email,
      password,
      gender,
      profilepic:customProfile[`${gender}`] || customProfile.male
    })
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    const err = errorHandler(error)
     res.status(400).json(err)
  }
},

    // Login Controller 

    async login(req, res){
      const {email, password} = req.body;
      try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.status(201).json({token:"Bearer " + token})
      } catch (err) {
        const errors = errorHandler(err)
        res.status(400).json(errors)
      } 
    }
   
      
}

module.exports = userController