const router = require("express").Router();
const Product = require("../../models/Product");
const verify = require("../../authentication/authVerify");

//get product by is active

router.get("/getProducts",verify,async(req,res) => {
    const categoryId = req.query.categoryId;
    const isPagination = req.query.isPagination;
    const offset = req.query.offset
    try{
        const data = isPagination?await Product.find({isActive: true,categoryId: categoryId}):
                                  await Product.find({isActive: true,categoryId: categoryId}).limit(10);
        res.status(200).send({status: true,data})
    }catch(err){
        res.status(500).send({status: false, message: "Internal server error"})
    }
});

router.post("/addProduct",async(req,res) => {
    const productData = req.body;
    if(productData){
        const data = new Product({
            name: productData?.name,
            imageUrl: productData?.imageUrl,
            price: productData?.price,
            description: productData?.description,
            stock: productData?.stock,
            categoryId: productData?.categoryId,
            isActive: productData?.isActive
        })

        try{
            const result = await data.save();

            if(result){
                res.status(200).send({status: true,message: "Product successfully added"});
            }else{
                res.status(200).send({status: false,message: "Something wrong"});
            }
        }catch (err) {
            res.status(500).send({status: false,message: "Internal server error"});
        }
    }
});

router.get("/getProductById",verify,async(req,res) => {
    const productIds = req.query.productIds
    try{
        const productDetails = await Product.find({ _id: { $in: productIds } });

        if(productDetails){
            res.status(200).send({status: true, data: productDetails})
        }else{
            res.status(200).send({status: false, message: "No data found"})
        }
    }catch(err){
        res.status(500).send({status: false, message: "Internel server error"})
    }
})

router.post("/updateProduct",verify,async(req,res) => {

});

router.delete("/deleteProduct",verify,async(req,res) => {

})



module.exports = router;