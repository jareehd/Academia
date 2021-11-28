const express =  require('express')
const router = new express.Router()

const auth = require('../utils/auth')
const userController = require('../controllers/userController')

router.get('/user', auth, async(req,res) => {
    res.send(req.user)
});

router.get('/login', userController.signInPage);

router.get('/logout', userController.signOut);

router.post('/signup', userController.signUp);

router.post('/login', userController.signIn);

module.exports = router
