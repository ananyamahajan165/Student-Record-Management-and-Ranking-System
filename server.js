const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



app.post("/add-student", (req, res) => {
    try {
        const { name, roll, marks } = req.body;

        if (!name || !roll || !marks) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const filePath = path.join(__dirname, "students.json");
        const students = JSON.parse(fs.readFileSync(filePath));

        const exists = students.find(s => s.roll === roll);
        if (exists) {
            return res.status(400).json({ message: "Roll number already exists" });
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
});


app.get("/students", (req, res) => {
    try {
        const filePath = path.join(__dirname, "students.json");
        const students = JSON.parse(fs.readFileSync(filePath));
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


app.get("/ranking", (req, res) => {
    try {
        const filePath = path.join(__dirname, "students.json");
        let students = JSON.parse(fs.readFileSync(filePath));

        students.sort((a, b) => b.marks - a.marks);

        for (let i = 0; i < students.length; i++) {
            students[i].rank = i + 1;
        }

        res.json(students);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});