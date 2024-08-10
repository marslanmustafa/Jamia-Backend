const express = require('express');
const classController = require("../controllers/class");
const router = express.Router();

router.post('/addclass', classController.addClass);
router.get('/getAllClasses', classController.getAllClasses);
router.get('/getClassById/:id', classController.getClassById);
router.delete('/deleteClassById/:id', classController.deleteClass);

module.exports = router;
