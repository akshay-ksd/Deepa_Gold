const mongoose = require("mongoose");

const payMentTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("paymentType",payMentTypeSchema);