const PayMentType = require("../../models/PayMentType");

module.exports = async function(paymentTypeId,paymentCredential){
    const PayMent = await PayMentType.findOne({_id: paymentTypeId});
    let status = false
    if(PayMent){
        const name = PayMent?.name;

        if(name == "COD"){
            status = false;
        }else{
            status = true;
        }
    };

    return status;
}