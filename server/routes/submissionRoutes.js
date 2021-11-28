const express =  require('express')
const router = new express.Router()
const multer = require('multer')
const upload = multer().single('filename')

const auth = require('../utils/auth')
const submissionController = require('../controllers/submissionController');

router.get('/class/:id/assignment/:assignment_id/delete_submission', auth, submissionController.deleteSubmission);

router.get('/class/:id/assignment/:assignment_id/user/:user_id', auth, submissionController.showSubmission);

router.post('/grade/:submission_id', auth, submissionController.gradeSubmission);

router.post('/class/:id/assignment/:assignment_id/submit', auth, upload, submissionController.submitSubmission);

module.exports = router
