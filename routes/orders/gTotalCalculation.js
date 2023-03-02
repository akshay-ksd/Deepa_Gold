module.exports = function(total,totalDiscount,gst,others){
    const discountedTotal = total - totalDiscount;
    const totalGst = gst.sgst + gst.cgst;
    const gTotal = discountedTotal + totalGst + others;

    return gTotal;
}