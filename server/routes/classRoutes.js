const express =  require('express')
const router = new express.Router()

const auth = require('../utils/auth')
const classController = require('../controllers/classController');

router.get('/class', auth, classController.dashboard);

router.get('/class/:id', auth, classController.class);

router.get('/class/join', auth, classController.joinClass);

router.get('/class/:id/leave', auth, classController.leaveClass);

router.post('/class', auth, classController.createClass);

router.post('/class/:id/remove', auth, classController.removeStudents);

module.exports = router
