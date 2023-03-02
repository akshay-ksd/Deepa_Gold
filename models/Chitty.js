const mongoose = require("mongoose");

const chittySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    planId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    requestFoarm: {},
    paymentDetails: [],
    isClosed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("chitty",chittySchema);