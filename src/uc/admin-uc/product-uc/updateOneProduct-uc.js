const Product = require('../../../entities/product');

async function execute(name,image,color,price,brand,sizeProduct,
    descriptionShort,category, id){
    const product = await Product.findById(id);
    if(product){
        product.name = name ,
        product.image = image,
        product.color = color ,
        product.price = price,
        product.brand = brand,
        product.sizeProduct = sizeProduct
        product.descriptionShort = descriptionShort,
        product.category = category
    }    
    const updatedProduct = await product.save();
    return updatedProduct
};

module.exports = execute 