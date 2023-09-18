const errorHandler = (err) =>{
  console.log(err.message, err.code);
  let errors = {email:"", password:""};


  // for duplicate email error

  if(err.code === 11000){
    errors.email = 'That email is already taken'
  }

  // incorrect email

  if(err.message === 'incorrect email'){
    errors.email = 'That email is not registered'
  }

// incorrect password
  if(err.message === "incorrect password"){
    errors.password = 'That password is incorrect'
  }

  if(err.message.includes('User validation failed')){
    console.log(err)
    Object.values(err.errors).forEach(({properties})=>{
       errors[properties.path] = properties.message
    })
  }
  return errors
}


module.exports = errorHandler;