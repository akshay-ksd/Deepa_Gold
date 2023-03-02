const router = require("express").Router();
const Category = require("../../models/Category");
const verify = require("../../authentication/authVerify");

//get category
router.get("/getCategory",verify, async(req, res) => {
    console.log("connect")
    try{
        const data = await Category.find({isActive: true});

        res.status(200).send({status: true,data: data})
    }catch(err){
        res.status(500).send({status: false,message: "Internal server error"})
    }
});

//add category
router.post("/addCategory", async(req, res) => {
    const data = req.body;

    if(data){
        const categoryData = new Category({
            categoryName: data?.categoryName,
            imageUrl: data?.imageUrl,
            isActive: data?.isActive,
            actionType: data?.actionType,
            actionId: data?.actionId
        });

        try{
            const result = await categoryData.save();
            console.log("result",result)
            if(result){
                res.status(200).send({status: true, message: "Successfully uploaded"})
            }else{
                res.status(200).send({status: false, message: "Something went wrong"})
            }
        }catch(err){
            res.status(500).send({status: false,message: "Internal Server Error"})
        }
    }
});

//update category
router.post("/updateCategory",verify,async(req,res) => {

});

//delete category
router.delete("/deleteCategory",verify,async(req,res) => {

});

module.exports = router