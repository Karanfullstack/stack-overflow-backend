const User = require('../models/User');
const errorHandler = require('../services/errorHandler')
const userController = {
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
}
}

module.exports = userController