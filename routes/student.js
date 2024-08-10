const express = require('express');
const studentController = require("../controllers/student");
const router = express.Router();

router.post('/addStudent', studentController.addStudent);
router.get('/getAllStudents', studentController.getAllStudents);
router.put('/updateStudent/:id', studentController.updateStudent);
router.get('/getStudentbyId/:id', studentController.getStudentById);
router.delete('/deleteStudentById/:id', studentController.deleteStudentById);

module.exports = router;
