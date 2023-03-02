const mongoose = require("mongoose");

const homeBannerSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
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
        required: true
    }
});

module.exports = mongoose.model("HomeBanner",homeBannerSchema);