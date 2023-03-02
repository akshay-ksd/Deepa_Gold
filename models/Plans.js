const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:[],
    termsAndCondition:[],
    amount: [],
    duration: {
        type: Number,
        default: 11
    },
    isActive: {
        type: Boolean,
        default: true
    },
    banners: []
});

module.exports = mongoose.model("plan", planSchema);