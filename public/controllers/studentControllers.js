const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../students.json");

// GET students
exports.getStudents = (req, res) => {

    const data = fs.readFileSync(filePath);
    const students = JSON.parse(data);

    res.json(students);
};

// ADD student
exports.addStudent = (req, res) => {

    const newStudent = req.body;

    const data = fs.readFileSync(filePath);
    const students = JSON.parse(data);

    students.push(newStudent);

    fs.writeFileSync(filePath, JSON.stringify(students));

    res.send("Student added");
};

// DELETE student
exports.deleteStudent = (req, res) => {

    const id = req.params.id;

    const data = fs.readFileSync(filePath);
    let students = JSON.parse(data);

    students = students.filter(s => s.id != id);

    fs.writeFileSync(filePath, JSON.stringify(students));

    res.send("Student deleted");
};

// RANKING
exports.getRanking = (req, res) => {

    const data = fs.readFileSync(filePath);
    let students = JSON.parse(data);

    students.sort((a,b)=> b.marks - a.marks);

    students.forEach((s,i)=>{
        s.rank = i+1;
    });

    res.json(students);
};

exports.updateStudent = (req, res) => {

    const id = req.params.id;
    const updatedData = req.body;

    const data = fs.readFileSync(filePath);
    let students = JSON.parse(data);

    students = students.map(s =>
        s.id == id ? { ...s, ...updatedData } : s
    );

    fs.writeFileSync(filePath, JSON.stringify(students));

    res.send("Student updated");
};

exports.getTopper = (req,res)=>{

 const data = fs.readFileSync(filePath);
 const students = JSON.parse(data);

 const topper = students.sort((a,b)=>b.marks-a.marks)[0];

 res.json(topper);

}