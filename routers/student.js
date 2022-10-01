const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.send(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const alreadyexist = await Student.find({ name: req.body.name });
    if (alreadyexist.length) {
      res.send({
        data: {
          message: "Student name already exist",
        },
      });
      return;
    }
    const student = new Student({
      name: req.body?.name,
      age: req.body?.age,
      gender: req.body?.gender,
    });
    const students = await student.save();
    res.json(students);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:name", async (req, res) => {
  try {
    const students = await Student.find({ name: req.params.name });
    res.json(students);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:name", async (req, res) => {
  try {
    const student = await Student.findOne({ name: req.params.name });
    student.name = req.body.name;
    student.age = req.body.age;
    const edit = await student.save();
    res.send(edit);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const student = await Student.deleteMany({ name: req.body.name });
    if (student.length) {
      res.send({
        data: {
          message: "Successfully Deleted",
        },
      });
      return;
    }
    res.send({ data: { message: "Student not Found" } });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
