const Product  = require('../entities/product');

const brandProduct = async(id) => {
    const productWithBrand = await Product.find({brand:id})
    console.log(productWithBrand)
    if(productWithBrand){
        throw new Error('Existen productos con esta marca')
    }
}
module.exports = {brandProduct}