const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    address:[]
});

module.exports = mongoose.model("address",addressSchema);