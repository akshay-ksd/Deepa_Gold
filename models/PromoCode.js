const { Decimal128 } = require("bson");
const mongoose = require("mongoose");

const promocodeSchema = new mongoose.Schema({
    promoCodeName : {
        type: String,
        required: true
    },
    validFrom:{
        type: Date,
        required: true
    },
    validTo:{
        type: Date,
        required: true
    },
    count:{
        type: Number,
        default: 0
    },
    discountMode:{
        type: Number,
        default: 0
    },
    discount:{
        type: Decimal128,
        default: 0
    }
});

module.exports = mongoose.model("promoCode", promocodeSchema);