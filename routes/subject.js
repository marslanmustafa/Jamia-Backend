const express = require('express');
const subjectController = require("../controllers/subject");
const router = express.Router();

router.post('/addSubject', subjectController.addSubject);
router.get('/getAllSubjects', subjectController.getAllSubjects);
router.get('/getSubjectById/:id', subjectController.getSubjectById);
router.delete('/deleteSubjectById/:id', subjectController.deleteSubject);

module.exports = router;
