const express = require("express");
const router = express.Router();

const controller = require("../controllers/studentController");

router.get("/students", controller.getStudents);

router.post("/add-student", controller.addStudent);

router.get("/ranking", controller.getRanking);

router.delete("/students/:roll", controller.deleteStudent);

module.exports = router;