const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (_id)=>{
return jwt.sign({_id}, process.env.JWT_KEY,{
  expiresIn:maxAge
})
}

module.exports = {createToken,maxAge}

