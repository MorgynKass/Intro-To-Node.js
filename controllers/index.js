const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// displays text in the browser for "/"
const awesomeFunction = (req, res, next) => {
  res.send("Awesome name!");
};

// displays text in the browser for "/ttech"
const tTech = (req, res, next) => {
  res.send("Tooele Tech is awesome!");
};

// getting all the students in the database
const getAllStudents = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("test").find({});
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//  a single student in the database
const getSingleStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("test")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// creating a student for the database
const createStudent = async (req, res) => {
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      currentCollege: req.body.currentCollege,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("test")
      .insertOne(student);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// editing or updating a student in the database
const updateStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      currentCollege: req.body.currentCollege,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("test")
      .replaceOne({ _id: userId }, student);
    console.log(response);
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// deleting a student in the database
const deleteStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("test")
      .deleteOne({ _id: userId });
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  awesomeFunction,
  tTech,
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
