const express = require("express");
const router = express.Router();

const controller = require("../controllers/studentController");

router.get("/students", controller.getStudents);

router.post("/add-student", controller.addStudent);

router.delete("/students/:id", controller.deleteStudent);

router.get("/ranking", controller.getRanking);

router.put("/students/:id", controller.updateStudent);

router.get("/topper", controller.getTopper);

module.exports = router;
