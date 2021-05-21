const { Router } = require('express');
const router = Router();
const {getProducts,getOneProduct} = require('../controllers/productController');
///api/product
/*si istalamos el i express-async-hander no tengo que hacer el trycath en cada uno de ellos

//get all products
const asyncHandler = require('express-async-handler');
router.get('/', asyncHandler(async (req,res)=>{
    const products = await Product.find({})
    res.json(products)
}));
*/
router.get('/',getProducts);

router.get('/:id',getOneProduct)

module.exports = router