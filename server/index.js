
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require('mongoose');
const User = require("./user.model");


app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello, world! ");
});

app.post("/addstudent", (req, res) => {
    const studentData = req.body;
    let existingData = [];

    try {
        existingData = JSON.parse(fs.readFileSync("students.json"));
    } catch (error) {}

    existingData.push(studentData);

    fs.writeFileSync("students.json", JSON.stringify(existingData, null, 2));

    res.json({ success: true, message: "Student added successfully!" })
});

app.get("/viewStudents", (req, res) => {
    try {
        const studentData = JSON.parse(fs.readFileSync("students.json"));
        res.json(studentData);
    } catch (error) {
        console.error("Error reading student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/editStudent", (req, res) => {
    const updateStudentData = req.body;
    let existingData = [];

    try {
        existingData = JSON.parse(fs.readFileSync("students.json"));
        const index = existingData.findIndex(student => student.ID == updateStudentData.ID);

        if (index !== -1) {
            existingData[index] = updateStudentData;
            fs.writeFileSync("students.json", JSON.stringify(existingData, null, 2));

            res.json({ success: true, message: "Student updated successfully!" });
        } else {
            res.status(404).json({ error: "Student not found" });
        }
    } catch (error) {
        console.error("Error updating student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/deleteStudent/:id', async(req, res) => {
    const id = req.params.id;
    try {
        // Read the students.json file
        const studentsData = fs.readFileSync('students.json', 'utf-8');
        // Parse the JSON data
        const students = JSON.parse(studentsData);
        // Find the index of the student with the given ID in the students array
        const index = students.findIndex(student => student.ID === id);
        if (index !== -1) {
            // Remove the student from the students array
            students.splice(index, 1);
            // Update the students.json file with the updated students array
            fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
            res.send(`Student with ID ${id} deleted successfully.`);
        } else {
            res.status(404).send(`Student with ID ${id} not found.`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting student.');
    }
});
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


// Endpoint to add a user
app.post("/addUser", async(req, res) => {
    const userData = req.body;

    try {
        // Create a new user document using the User model and the received data
        const user = new User(userData);
        // Save the user document to the database
        await user.save();
        res.json({ success: true, message: "User added successfully!" });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to view all users
app.get("/viewUsers", async(req, res) => {
    try {
        // Retrieve all user documents from the database
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to edit a user by email
app.put("/editUser/:email", async(req, res) => {
    const userEmail = req.params.email;
    const updatedUserData = req.body;

    try {
        // Find the user by email and update the user data
        const updatedUser = await User.findOneAndUpdate({ Email: userEmail }, updatedUserData, { new: true });

        if (updatedUser) {
            res.json({ success: true, message: "User updated successfully", user: updatedUser });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

const port = 1337;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
