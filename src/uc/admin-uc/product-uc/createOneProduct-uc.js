const Product = require('../../../entities/product');

async function execute(user,name,image,color,price,brand,sizeProduct,
    descriptionShort,category){
    const createdProduct = new Product({
            user: user, 
            name: name,
            image: image,
            color: color,
            price: price || 0,
            brand: brand, 
            sizeProduct:sizeProduct,
            descriptionShort: descriptionShort,
            category: category,
        })
        await createdProduct.save();
        return createdProduct
};

module.exports = execute 