const express = require('express');
const router = express.Router();
const authRoutes= require('./routes/auth')
const classRoutes= require('./routes/class')
const studentRoutes= require('./routes/student')

router.use('/auth',authRoutes)
router.use('/class',classRoutes)
router.use('/student',studentRoutes)

module.exports=router