const Product  = require('../entities/product');

const isProductValidator = async(id) => {
    const isProduct = await Product.findById({_id:id});
    if(isProduct === null || isProduct.length < 0){
        throw new Error(`No se encuentra el producto ${id}`)
    }
}
module.exports = {isProductValidator}
