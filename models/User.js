const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: false,
        max: 255
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    lastLogin:{
        type: Date
    },
    isActive:{
        type: Boolean
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    }
});

module.exports = mongoose.model("User", userSchema);