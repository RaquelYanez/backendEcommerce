const Product= require('../../entities/product');

async function execute(){
    const topProduct = await Product.find({}).sort({ratingProduct:-1}).limit(6);
    return topProduct
}

module.exports = execute 