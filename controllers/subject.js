const { Subject } = require("../db/index");
const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

// Register a new subject
const addSubject = async (req, res, next) => {
  try {
    const { subjectName } = req.body;

    if (!subjectName) {
      return next(new HttpError("Please provide a subject name.", 400));
    }

    const existingSubject = await Subject.findOne({ where: { subjectName } });

    if (existingSubject) {
      return next(new HttpError("Subject already exists.", 400));
    }

    const id = uuidv4();

    const newSubject = await Subject.create({
      id,
      subjectName,
    });

    res.status(201).json({
      success: true,
      message: "Subject successfully created!",
      data: newSubject,
    });
  } catch (error) {
    console.error(error);
    next(new HttpError("Subject creation failed, please try again later.", 500));
  }
};

// Get all subjectes
const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.findAll({ order: [["createdAt", "DESC"]] });

    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully.",
      data: subjects,
    });
  } catch (error) {
    console.error(error);
    next(new HttpError("Fetching subjects failed, please try again later.", 500));
  }
};

// Get a single subject by ID
const getSubjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundSubject = await Subject.findOne({ where: { id } });

    if (!foundSubject) {
      return next(new HttpError("Subject not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Subject fetched successfully.",
      data: foundSubject,
    });
  } catch (error) {
    console.error(error);
    next(new HttpError("Fetching subject failed, please try again later.", 500));
  }
};

// Delete a subject by ID
const deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundSubject = await Subject.findOne({ where: { id } });

    if (!foundSubject) {
      return next(new HttpError("Subject not found.", 404));
    }

    await Subject.destroy({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    next(new HttpError("Deleting subject failed, please try again later.", 500));
  }
};

exports.addSubject = addSubject;
exports.getAllSubjects = getAllSubjects;
exports.getSubjectById = getSubjectById;
exports.deleteSubject = deleteSubject;
