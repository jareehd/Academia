const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const secret = process.env.jwt_secret

const auth = async function (req,res,next) {
    try {
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token , secret)

        const user = await User.findOne({_id : decoded._id  })
        if(!user)
          throw new Error('Please authenticate')

        req.token = token
        req.user = user
        next()
    } catch (e) {

        res.redirect('/login')
    }
}

module.exports = auth