const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    time:{
        type: Date,
        default: new Date()
    },
    product:[]
});

module.exports = mongoose.model("Cart", cartSchema);