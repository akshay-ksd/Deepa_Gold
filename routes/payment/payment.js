const router = require("express").Router();
const Payment = require("../../models/PayMentType");
const verify = require("../../authentication/authVerify");

router.post("/addPaymentType",async(req,res) => {
    const name = req.body.name;
    const isActive = req.body.isActive;

    try{
        const data = new Payment({
            name: name,
            isActive: isActive
        });

        const result = await data.save();

        if(result){
            res.status(200).send({status: true, message:"Successfully addedd"});
        }else{
            res.status(200).send({status: false, message:"Something wrong"});
        }
    }catch(error){
        res.status(500).send({status: false, message:"Internel server error"});
    };
});

router.get("/getPaymentTypes",verify,async(req,res) => {

    try{
        const data = await Payment.find({isActive: true});

        if(data){
            res.status(200).send({status: true, data: data});
        }else{
            res.status(200).send({status: false});
        }
    }catch (err){
        res.status(500).send({status:false,message: "Internel server error"})
    }
})

router.get("/getPaymentTypeById",verify,async(req,res) => {
    const paymentId = req.query.paymentId;

    if(paymentId){
        try{
            const paymentDetails = await Payment.findOne({_id: paymentId});
            if(paymentDetails){
                res.status(200).send({status: true,data: paymentDetails});
            }else{
                res.status(200).send({status: false,message: "No data found"});
            }
        }catch(err){
            res.status(500).send({status: false,message: "Internel server error"});
        }
    }
})

module.exports = router;