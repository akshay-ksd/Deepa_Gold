const PromoCode = require("../../models/PromoCode")

module.exports = async function(total,promocodeId){
    const code = await PromoCode.findOne({_id: promocodeId});

    if(code){
        const discountMode = code?.discountMode;
        const discount = code?.discount;
        let promoDiscount = 0;
        if(discountMode == 0){
             promoDiscount = (total * discount)/100
        }else{
             promoDiscount = discount
        }

        return promoDiscount;
    }
}