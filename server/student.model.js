const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    ID: { type: String, required: true, unique: true },
    First: { type: String, required: true },
    Last: { type: String, required: true },
    Middle: { type: String, required: true },
    Course: { type: String, required: true },
    Year: { type: String, required: true },

}, { collection: "student-data" });

const Student = mongoose.model('Student', UserSchema);

module.exports = Student;