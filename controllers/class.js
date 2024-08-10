const { Class } = require("../db/index");
const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

// Register a new class
const addClass = async (req, res, next) => {
  try {
    const { className } = req.body;

    if (!className) {
      return next(new HttpError("Please provide a class name.", 400));
    }

    const existingClass = await Class.findOne({ where: { className } });

    if (existingClass) {
      return next(new HttpError("Class name already exists.", 400));
    }

    const id = uuidv4();

    const newClass = await Class.create({
      id,
      className,
    });

    res.status(201).json({
      success: true,
      message: "Class successfully created!",
      data: newClass,
    });
  } catch (error) {
    console.error(error);
    next(new HttpError("Class creation failed, please try again later.", 500));
  }
};

// Get all classes
const getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.findAll({ order: [["createdAt", "DESC"]] });

    res.status(200).json({
      success: true,
      message: "Classes fetched successfully.",
      data: classes,
    });
  } catch (error) {
    console.error(error);
    next(new HttpError("Fetching classes failed, please try again later.", 500));
  }
};

// Get a single class by ID
const getClassById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundClass = await Class.findOne({ where: { id } });

    if (!foundClass) {
      return next(new HttpError("Class not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Class fetched successfully.",
      data: foundClass,
    });
  } catch (error) {
    console.error(error);
    next(new HttpError("Fetching class failed, please try again later.", 500));
  }
};

// Delete a class by ID
const deleteClass = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundClass = await Class.findOne({ where: { id } });

    if (!foundClass) {
      return next(new HttpError("Class not found.", 404));
    }

    await Class.destroy({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Class deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    next(new HttpError("Deleting class failed, please try again later.", 500));
  }
};

exports.addClass = addClass;
exports.getAllClasses = getAllClasses;
exports.getClassById = getClassById;
exports.deleteClass = deleteClass;
