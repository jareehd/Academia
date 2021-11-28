const Class = require("../models/classModel");
const File = require("../models/fileModel");
const Submission = require("../models/submissionModel");

// Controller for delete current submission for Student
module.exports.deleteSubmission = async function (req,res) {

  try {

    const user_id = req.user._id
    const classId = req.params.id
    const assignmentId = req.params.assignment_id
    const current_class = await Class.findById(classId)

    if(!current_class)
      throw Error("Invalid Class Id")

    if(!current_class.students || !current_class.students.includes(user_id))
      throw Error("Not a member");

    const submission = await Submission.findOne({owner_student : user_id, owner_assignment :assignmentId })
    
    await File.findByIdAndDelete(submission.submission)
    await submission.remove()
    
    res.redirect('/class/' + classId + '/assignment/' + assignmentId + '/view?teacher=false')

  } catch (e) {
      
    res.render('error')

  }
};

// Controller for show Student Submission
module.exports.showSubmission = async function (req,res) {

  try {
    
    const user_id = req.user._id
    const classId = req.params.id
    const assignmentId = req.params.assignment_id
    const studentId = req.params.user_id
    
    const submission = await Submission.findOne({owner_student:studentId , owner_assignment: assignmentId});
    const current_class = await Class.findById(classId)

    if(!current_class)
      throw Error("Invalid Class Id")

    if(!submission)
      throw Error("Invalid SubmissionId")

    const submittedFile  = await File.findById(submission.submission)
                          
    const submission_data = {
      submissionPdf: submittedFile.file,
      submissionId: submission._id,
      isTeacher : (studentId.toString() != user_id.toString())
    }

    res.render( 'submission' ,{submission_data : submission_data})

  } catch (e) {
      
    res.render('error')

  }
};

// Controller for grading a student submission
module.exports.gradeSubmission = async function (req,res) {

  try {
    
    const submissionId = req.params.submission_id
    const grade = req.body.grade
    
    if(!grade)
      throw Error("Invalid Data")

    const submission = await Submission.findByIdAndUpdate(submissionId , {grade : grade});

    res.redirect('/class/' + submission.class + '/assignment/' + submission.owner_assignment + '/view?teacher=true')

  } catch (e) {
      
    res.render('error')

  }
};

// Student Controller submit submission
module.exports.submitSubmission = async function (req,res) {

  try {

    const user_id = req.user._id
    const classId = req.params.id
    const assignmentId = req.params.assignment_id

    const current_class = await Class.findById(classId)

    if(!current_class)
      throw Error("Invalid Class Id")

    if(!current_class.students || !current_class.students.includes(user_id))
      throw Error("Not a member"); 

    const file = new File({
      file: req.file.buffer,
      owner: user_id,
      class: classId,
      assignment : assignmentId
    })

    await file.save()

    const submission = new Submission({
      owner_student: user_id,
      owner_assignment: assignmentId,
      class: classId,
      submission: file._id
    })
    
    await submission.save()

    res.redirect('/class/' + classId + '/assignment/' + assignmentId + '/view?teacher=false')

  } catch (e) {
      
    res.render('error')

  }
};
