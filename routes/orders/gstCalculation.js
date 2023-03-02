module.exports = function(total){
    const SGST_P = ( total * 5) / 100
    const CGST_P = ( total * 5) / 100

    const gst = {sgst: SGST_P, cgst: CGST_P};
    return gst;
}