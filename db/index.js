// db/index.js
const UserModel = require('../models/user');
const StudentModel = require('../models/student');
const ClassModel = require('../models/class');
const SubjectModel = require('../models/subject');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('jamiadb', 'root', '', {
// const sequelize = new Sequelize('umazing', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection established.');
  })
  .catch((error) => {
    console.log('Error: ' + error);
  });

const User = UserModel(sequelize, Sequelize);
const Student = StudentModel(sequelize, Sequelize);
const Class = ClassModel(sequelize, Sequelize);
const Subject = SubjectModel(sequelize, Sequelize);

// Define Associations
module.exports = {
User,
Class,
Student,
Subject
};
