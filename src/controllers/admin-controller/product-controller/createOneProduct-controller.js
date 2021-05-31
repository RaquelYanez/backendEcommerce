const { createProduct } = require('../../../uc');

//@desc Dar de alta un producto
//@route POST /api/brand
//@acces private ADMIN
async function execute(req,res){
const {user,name,image,color,price,brand,sizeProduct,
    descriptionShort,category,totalReviews} = req.body
    try {
        const createdProduct = 
        await createProduct(user,name,image,color,price,brand,sizeProduct,
            descriptionShort,category,totalReviews);
        res.status(201).json(createdProduct)
    } catch (error) {
        res.status(500).json({msg:'error en la creacion del producto'})
    }
};

module.exports = execute 