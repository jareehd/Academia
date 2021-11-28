const jwt = require('jsonwebtoken')
const secret = process.env.jwt_secret

const User = require('../models/userModel')

// Controller for New User Registration
module.exports.signUp = async function (req,res) {
    
  const user = new User(req.body)

  try {
    const maxAge = 5 * 24 * 60 * 60;
    const token = jwt.sign({ _id: user._id.toString() } , secret)

    await user.save()

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect('/class')

  } catch (e) {
      
    res.render('signIn')

  }
};

// Controller for User SignIn
module.exports.signIn = async function (req,res) {

  try {
    const maxAge = 5 * 24 * 60 * 60;

    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = jwt.sign({ _id: user._id.toString() } , secret)
    
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect('/class')
    
  } catch (e) {  

    res.render('signIn')
  
  }
}

// Controller for Rendering to SignIn / SignUp Page
module.exports.signInPage = async function (req, res) {

  const cookies_token = req.cookies.jwt;
  if (cookies_token) {
    jwt.verify(cookies_token, process.env.jwt_secret, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.render('signIn')
      } else {
        res.redirect('/class')
      }
    });
  }
  
  res.render('signIn')
}

// Controller for User Sign Out
module.exports.signOut = async function (req, res) {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/login');
}
