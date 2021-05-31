const Product  = require('../entities/product');

const brandProduct = async(id) => {
    const productWithBrand = await Product.find({brand:id})
    if(productWithBrand.length > 0){
        throw new Error('Existen productos con esta marca')
    }
}
module.exports = {brandProduct}