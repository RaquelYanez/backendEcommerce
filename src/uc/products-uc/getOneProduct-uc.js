const Product = require('../../entities/product');

async function execute(id){

    const product = await Product.findById(id)
    .populate('user', 'name').select('-user')
    .populate('category')
    .populate('brand')
    .populate('sizeProduct.size')
    .populate('reviews.user', 'name');
    return product
}
module.exports = execute 