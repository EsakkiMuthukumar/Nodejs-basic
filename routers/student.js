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
  const student = new Student({
    name: req.body?.name,
    age: req.body?.age,
    gender: req.body?.gender,
  });
  try {
    const stud = await student.save();
    res.json(stud);
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

module.exports = router;
