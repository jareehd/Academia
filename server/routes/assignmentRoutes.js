const express =  require('express')
const router = new express.Router()

const multer = require('multer')
const upload = multer().single('filename')

const auth = require('../utils/auth')
const assignmentController = require('../controllers/assignmentController');

router.get('/class/:id/assignment/:assignment_id/view', auth, assignmentController.showAssignment);

router.get('/class/:id/assignment/create', auth, assignmentController.createAssignmentPage);

router.get('/class/:id/assignment/:assignment_id/delete_assignment', auth, assignmentController.deleteAssignment);

router.get('/class/:id/assignment/:assignment_id/analysis', auth, assignmentController.userAnalysis);

router.post('/class/:id/assignment', auth, upload, assignmentController.createAssignment);

module.exports = router
