const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: { type: String, required: true },
    },    
    { collection: "user-data" }
);

const User = mongoose.model('UserData', UserSchema);

module.exports = User;
