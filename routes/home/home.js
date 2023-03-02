const router = require("express").Router();
const HomeBanner = require("../../models/HomeBanner");
const verify = require("../../authentication/authVerify")

//get active homeBanner 
router.get("/getHomeBanner",verify,async(req, res) => {
    //get active banners
    try{
        const data = await HomeBanner.find({isActive: true});
        res.status(200).send({status: true, data});
    }catch (err){
        res.status(500).send({status: false, message:"Internal server error"})
    }
});

//add home banner
router.post("/addHomeBanner",verify,async(req, res) => {
    const bannerData = req.body;
    if(bannerData){
      const data = new HomeBanner({
        imageUrl: bannerData?.imageUrl,
        isActive: bannerData?.isActive,
        actionType: bannerData?.actionType,
        actionId: bannerData?.actionId
      });

      try{
        const result = await data.save();
        if(result){
            res.status(200).send({status: true})
        }else{
            res.status(200).send({status: false})
        }
      }catch (err) {
        res.status(500).send({message:"Internal server error"})
      }
    }else{
        res.status(200).send({status: false})
    }
});

//update home banner
router.post("/updateHomeBanner",verify,async(req, res) => {

})

//delete home banner
router.delete("/deleteHomeBanner",verify,async(req, res) => {

})

module.exports = router