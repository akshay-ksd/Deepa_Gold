const router = require("express").Router();
const Chitty = require("../../models/Chitty");
const verify = require("../../authentication/authVerify");

router.post("/joinNewChitty",verify,async(req,res) =>{
    const userId = req.user._id;
    const planId = req.body.planId;
    const amount = req.body.amount;
    const requestFoarm = req.body.requestFoarm;
    const paymentDetails = [];

    try{
        const data = new Chitty({
            userId,
            planId,
            amount,
            requestFoarm,
            paymentDetails
        });

        if(data){
            const result = await data.save();
            if(result){
                res.status(200).send({status: true,message: "Chitty created"})
            }else{
                res.status(200).send({status: false,message: "Something wrong"})
            }
        }
    }catch(err){
        res.status(500).send({status: false,message: "Internel server error"})
    }
});

router.get("/getJoinedChitty",verify,async(req,res) => {
    const userId = req.user._id;
    try{
        const data = await Chitty.find({userId: userId});
        if(data){
            res.status(200).send({status: true, data: data})
        }else{
            res.status(200).send({status: false, message: "no data found"})
        }
    }catch(err){
        res.status(500).send({status: false, message: "Internal server error"})
    }
})

module.exports = router;