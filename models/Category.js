const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: "http://www.udaipurblog.com/wp-content/uploads/2018/12/My-Gold-Guide-600x410.jpg",
    },
    isActive:{
        type: Boolean,
        default: true
    },
    actionType:{
        type: Number,
        default: 0
    },
    actionId:{
        type: String,
        default: "0"
    }
});

module.exports = mongoose.model("Category", categorySchema);