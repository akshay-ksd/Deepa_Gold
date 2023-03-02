const Cart = require("../../models/Cart");

module.exports = async function(userId){
    var myquery = { userId: userId };
    const result = await Cart.deleteOne(myquery)

}