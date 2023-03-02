const router = require("express").Router();
const verify = require("../../authentication/authVerify");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const totalCalculation = require("./totalCalculation");
const gstCalculation = require("./gstCalculation");
const promoCodeCalculation = require("./promoCodeCalculation")
const gTotalCalculation = require("./gTotalCalculation");
const checkIsPaid = require("./checkIsPaid");
const clearCart = require("./clearCart");

router.post("/addNewOrder",verify,async(req,res) => {
    const userId = req.user._id;
    const addressId = req.body.addressId;
    const paymentTypeId = req.body.paymentTypeId;
    const paymentCredential = req.body.paymentCredential;
    const promoCodeApply = req.body.promoCodeApply;
    const promocodeId = req.body.promocodeId;
    const time = req.body.time;
    const status = [{id: 0, time: time}];
    const cartData = await Cart.findOne({userId: userId});
    if(cartData){
        //loadProduct
        const cartProduct = cartData?.product;
        const productData = [];
        const idS = []
        
        cartProduct.forEach((x)=>{
            productData.push({
                productId: x.productId,
                count: x.count
            });

            idS.push(x.productId);
        });

        const productDetails = await Product.find({ _id: { $in: idS } });
        
        productData.forEach((y,index) =>{
            const product = productDetails.find((x)=> x._id == y.productId);
            if(product){
                productData[index].price = product.price
            }
        });

        //Total calculation
        const total = totalCalculation(productData)

        //calculat gst
        const gst = gstCalculation(total);

        //others
        const others = 0;

        //discount
        let discount = 0;

        //promocode Calculation
        let promoCodeDiscount = await promoCodeApply?promoCodeCalculation(total,promocodeId):0

        //total discount
        const totalDiscount = discount + promoCodeDiscount;

        //gTotal
        let gTotal = gTotalCalculation(total,totalDiscount,gst,others)
        
        //check is Paid
        let paid = await checkIsPaid(paymentTypeId,paymentCredential);

        //add orderdata to data base

        const data =  new Order({
            userID: userId,
            product: productData,
            gst: gst,
            discount: discount,
            others: others,
            total: total,
            gTotala: gTotal,
            time: time,
            addressId: addressId,
            status: status,
            paymentTypeId: paymentTypeId,
            paid: paid,
            promocodeApplied: promoCodeApply,
            promocodeId: promocodeId,
            promoCodeDiscount: promoCodeDiscount
        });

        try{
            const result = await data.save();

            if(result){
                res.status(200).send({status: true,message: "Order Successfully Placed"});
                const clear = await clearCart(userId);
            }else{
                res.status(200).send({status: false,message: "Something Wrong"});
            }
        }catch (err){
            res.status(500).send({status: false,message: "Internel Server Error"});
        }
    }
});

router.get("/getOrder",verify,async(req,res) => {
    const userId = req.user._id;
    const offset = req.query.offset;
    let orderData = []
    if(userId){
        try{
            if(offset == 0){
               orderData = await Order.find({userID:userId}).limit(10);
            }else{
               orderData = await Order.find({userID:userId}).skip(offset).limit(10);
            }

            if(orderData){
                res.status(200).send({status: true, data: orderData});
            }else{
                res.status(200).send({status: false, message: "no data found"});
            }
        }catch(err){
            res.status(500).send({status: false, message: "Internal server error"})
        }
    }
})

module.exports = router;