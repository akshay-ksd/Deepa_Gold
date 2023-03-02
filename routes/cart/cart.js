const router = require("express").Router();
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const verify = require("../../authentication/authVerify");

router.post("/addToCart", verify, async (req, res) => {
  const productId = req.body?.productId;
  const count = req.body?.count;
  const userId = req.user?._id;
  const time = req.body?.time;

  let data = await Cart.findOne({ userId: userId });

  try {
    if (data) {
      let product = data?.product;
      const index = product.findIndex((x) => x.productId == productId);
      if (index !== -1) {
        product[index].count = count;
      } else {
        product.push({
          productId,
          count,
          time,
        });
      }
      data.product = product;

      const status = await data.save();

      if (status) {
        res.status(200).send({ status: true, message: "Successfully Updated" });
      } else {
        res.status(200).send({ status: false, message: "Something Wrong" });
      }
    } else {
      const product = [{ productId, count, time }];

      const cartData = new Cart({
        userId: userId,
        time: time,
        product: product,
      });

      const result = await cartData.save();

      if (result) {
        res.status(200).send({ status: true, message: "Successfully added" });
      } else {
        res.status(200).send({ status: false, message: "Something wrong" });
      }
    }
  } catch (err) {
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
});

router.get("/getCart", verify, async (req, res) => {
  const userId = req.user?._id;
 
  try {
    let data = await Cart.findOne({ userId: userId });
    if (data) {
      let productId = [];
      for (i of data.product) {
        productId.push(i.productId);
      }

      const productDetails = await Product.find({ _id: { $in: productId } });
      const product = [];
      for (let p in productDetails) {
        product.push({
          _id: productDetails[p]._id,
          name: productDetails[p].name,
          imageUrl: productDetails[p].imageUrl,
          price: productDetails[p].price,
          description: productDetails[p].description,
          stock: productDetails[p].stock,
          isActive: productDetails[p].isActive,
          count: data.product[p].count,
          time: data.product[p].time,
        });
      }
      data.product = product;
      res.status(200).send({ status: true, data: data });
    } else {
      res.status(200).send({ status: false, message: "No item in cart" });
    }
  } catch (err) {
    res.status(500).send({ status: false, message: "Internel server error" });
  }
});

router.get("/checkProductInCart", verify, async (req, res) => {
  const userId = req.user?._id;
  const productId = req.query?.productId;
  //get cart data
  try {
    let data = await Cart.findOne({ userId: userId });

    if (data) {
      const product = data?.product;

      const isProduct = product.find((x) => x.productId == productId);

      if (isProduct) {
        res.status(200).send({ status: true, message: "Product in cart" });
      } else {
        res.status(200).send({ status: false, message: "Product not in cart" });
      }
    } else {
      res.status(200).send({ status: false, message: "No item in cart" });
    }
  } catch (err) {
    res.status(500).send({ status: false, message: "Internel server error" });
  }
});

router.post("/updateCart", verify, async (req, res) => {
  const productId = req.body?.productId;
  const count = req.body?.count;
  const userId = req.user?._id;
  try {
    if (count > 0) {
      const query = { userId: userId, "product.productId": productId };
      const updateDocument = {
        $set: { "product.$.count": count },
      };

      const result = await Cart.updateOne(query, updateDocument);

      if (result) {
        res.status(200).send({ status: true, data: req.body });
      } else {
        res.status(200).send({ status: false, message: "Something wrong" });
      }
    } else {
     const result = await Cart.updateOne({userId: userId}, {$pull: {product: {productId: productId}}})
     if(result){
        res.status(200).send({ status: true, data: req.body });
        const data = await Cart.findOne({userId: userId})

        if(data){
            if(data?.product.length == 0){
                const query = { userId: userId };
                const result = await Cart.deleteOne(query);
            }
        }
     }else{
        res.status(200).send({ status: false, message: "Something wrong" });
     }
    }
  } catch (err) {
    console.log("result",err)
    res.status(500).send({ status: false, message: "Internal server error" });
  }
});

module.exports = router;
