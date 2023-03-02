const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        default: 0
    },
    description:{
        type: String
    },
    stock:{
        type: Number,
        default: 0
    },
    categoryId:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Product",productScheme);