const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use(express.static("public"));

app.use("/", studentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.use((req, res) => {
    res.status(404).send("Page not found");
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