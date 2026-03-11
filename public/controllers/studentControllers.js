const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../students.json");

exports.getStudents = (req, res) => {
    try {
        const students = JSON.parse(fs.readFileSync(filePath));
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Error reading students file" });
    }
};

exports.addStudent = (req, res) => {
    try {
        const { name, roll, marks } = req.body;

        if (!name || !roll || !marks) {
            return res.status(400).json({ message: "All fields required" });
        }

        const students = JSON.parse(fs.readFileSync(filePath));

        const exists = students.find(s => s.roll === roll);
        if (exists) {
            return res.status(400).json({ message: "Roll already exists" });
        }

        const newStudent = {
            name,
            roll,
            marks: parseInt(marks)
        };

        students.push(newStudent);

        fs.writeFileSync(filePath, JSON.stringify(students, null, 2));

        res.json({ message: "Student added successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getRanking = (req, res) => {
    try {
        let students = JSON.parse(fs.readFileSync(filePath));

        students.sort((a, b) => b.marks - a.marks);

        students.forEach((s, i) => {
            s.rank = i + 1;
        });

        res.json(students);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteStudent = (req, res) => {
    try {
        const roll = req.params.roll;

        let students = JSON.parse(fs.readFileSync(filePath));

        students = students.filter(s => s.roll !== roll);

        fs.writeFileSync(filePath, JSON.stringify(students, null, 2));

        res.json({ message: "Student deleted" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};