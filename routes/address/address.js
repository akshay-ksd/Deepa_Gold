const router = require("express").Router();
const verify = require("../../authentication/authVerify");
const Address = require("../../models/Address");

router.post("/addAddress", verify, async (req, res) => {
  const userId = req.user?._id;
  const address = req.body;

  if (address) {
    //check user address is exist
    try {
      const isAddress = await Address.findOne({ userId: userId });

      if (isAddress) {
        const result = await Address.findOneAndUpdate(
            {userId: userId},
            {$push: {address: address}}
        )

        if (result) {
            res.status(200).send({ status: true, message: "New Address Added" });
        } else {
            res.status(200).send({ status: false, message: "Something Wrong" });
        }
      } else {
        const addressData = new Address({
          userId: userId,
          address: address,
        });

        const result = await addressData.save();

        if (result) {
          res.status(200).send({ status: true, message: "New Address Added" });
        } else {
          res.status(200).send({ status: false, message: "Something Wrong" });
        }
      }
    } catch (error) {
        res.status(500).send({ status: false, message: "Internal server error" });
    }
  }
});

router.get("/getAddress",verify,async(req, res) => {
    const userId = req.user?._id;
    try{
        const address = await Address.findOne({userId: userId});
        if(address){
            res.status(200).send({status: true,data: address?.address});
        }else{
            res.status(200).send({status: false,message: "No address yet saved"});
        }
    }catch (err){
        res.status(500).send({status: false,message: "Internel server error"});
    }
});

router.get("/getAddressById",verify,async(req,res) => {
  const addressId = req.query.addressId;
  const userId = req.user._id;
  if(addressId){
    try{
      const adressData = await Address.findOne({userId:userId});
      if(adressData){
        const address = adressData?.address.find((x) => x.adressId == addressId);
        if(address){
          res.status(200).send({status: true, data: address});
        }else{
          res.status(200).send({status: false, message: "No Address Found"});
        }
      }
    }catch(err){
      res.status(500).send({status: false, message: "Internel server error"});
    }
  }
})

module.exports = router;
