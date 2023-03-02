const router = require("express").Router();
const Plans = require("../../models/Plans");
const verify = require("../../authentication/authVerify");

router.post("/addPlans",async(req,res) => {
    const name = req.body.name;
    const description = req.body.description;
    const termsAndCondition = req.body.termsAndCondition;
    const amount = req.body.amount;
    const duration = req.body.duration;
    const isActive = req.body.isActive;
    const banners = req.body.banners;

    try{
        const data = new Plans({
            name,
            description,
            termsAndCondition,
            amount,
            duration,
            isActive,
            banners
        });

        if(data){
            const result = await data.save();

            if(result){
                res.status(200).send({status: true,message: "Plan sussessfully added"})
            }else{
                res.status(200).send({status: false,message: "Something wrong"})
            }
        }
    }catch(err){
        res.status(500).send({status: false,message: "Internel server error"})
    }
});

router.get("/getAllPlans",verify,async(req,res) =>{
    try{
        const data = await Plans.find({isActive: true});

        if(data){
            res.status(200).send({status: true,data})
        }else{
            res.status(200).send({status: true,message: "No data found"})
        }
    }catch(err){
        res.status(500).send({status: false,message: "Internel server error"})
    }
})

module.exports = router;
