const totalCalculation =(product)=> {

};

module.exports = function(product){
    let total = 0;

    product.forEach((x,index) =>{
        total += x.count * x.price;
    });

    return total
}