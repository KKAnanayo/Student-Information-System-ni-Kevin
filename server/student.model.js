const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    ID: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    First: { type: String, required: true },
    Last: { type: String, required: true },
    Middle: { type: String, required: true },
    Course: { type: String, required: true },
    Year: { type: String, required: true },
    Image: {type: String}

}, { collection: "student-data" });

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;