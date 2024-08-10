const { Student, Class } = require("../db/index");
const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

// Add a new student
const addStudent = async (req, res, next) => {
  try {
    const { name, fatherName, rollNumber, classId } = req.body;

    if (!name || !fatherName || !rollNumber || !classId) {
      return next(new HttpError("Please fill all required fields!", 400));
    }

    // Check if classId is valid
    const classExists = await Class.findByPk(classId);
    if (!classExists) {
      return next(new HttpError("Class ID is invalid or does not exist!", 400));
    }

    const newStudent = await Student.create({
      id: uuidv4(),
      name,
      fatherName,
      rollNumber,
      classId,
    });

    res.status(201).json({
      success: true,
      message: "Student successfully added!",
      data: newStudent,
    });
  } catch (error) {
    next(new HttpError(`Failed to add student. ${error.message}`, 500));
  }
};

// Get all students, optionally filtered by classId
const getAllStudents = async (req, res, next) => {
  try {
    const { classId } = req.query;
    const filter = classId ? { where: { classId } } : {};

    const students = await Student.findAll({
      ...filter,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Students fetched successfully!",
      data: students,
    });
  } catch (error) {
    next(new HttpError(`Failed to fetch students. ${error.message}`, 500));
  }
};

// Get a single student by ID
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return next(new HttpError("Student not found!", 404));
    }

    res.status(200).json({
      success: true,
      message: "Student fetched successfully!",
      data: student,
    });
  } catch (error) {
    next(new HttpError(`Failed to fetch student. ${error.message}`, 500));
  }
};

// Update a student by ID
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, fatherName, rollNumber, classId } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return next(new HttpError("Student not found!", 404));
    }

    // Check if classId is valid
    if (classId) {
      const classExists = await Class.findByPk(classId);
      if (!classExists) {
        return next(new HttpError("Class ID is invalid or does not exist!", 400));
      }
      student.classId = classId;
    }

    student.name = name || student.name;
    student.fatherName = fatherName || student.fatherName;
    student.rollNumber = rollNumber || student.rollNumber;

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully!",
      data: student,
    });
  } catch (error) {
    next(new HttpError(`Failed to update student. ${error.message}`, 500));
  }
};

// Delete a student by ID
const deleteStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Student.destroy({ where: { id } });

    if (!result) {
      return next(new HttpError("Student not found!", 404));
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully!",
    });
  } catch (error) {
    next(new HttpError(`Failed to delete student. ${error.message}`, 500));
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudentById,
};
