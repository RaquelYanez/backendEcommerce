const Product = require('../../../entities/product');

async function execute(id){
    const product = await Product.findById(id);
    await product.remove()
    return product
};

module.exports = execute 