const { Decimal128 } = require("bson");
const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    product:[],
    gst:{},
    discount:{
        type: Decimal128,
        default: 0
    },
    others:{
        type: Decimal128,
        default: 0
    },
    total:{
        type: Decimal128,
        default: 0
    },
    gTotala:{
        type: Decimal128,
        default: 0
    },
    time:{
        type: Date,
        default: new Date()
    },
    addressId:{
        type: String,
        required: true
    },
    status: [],
    paymentTypeId:{
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    promocodeApplied:{
        type: Boolean,
        default: false
    },
    promocodeId:{
        type: String,
        default: "false"
    },
    promoCodeDiscount:{
        type: Decimal128,
        default: 0
    }
});

module.exports = mongoose.model("orders",ordersSchema);

