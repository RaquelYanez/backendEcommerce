const {Router} = require('express');
const router = Router();
const {getProductsByCategoryController,filterByBrandController,filterByNameController} = require('../controllers')

router.get('/:category/products', getProductsByCategoryController)

router.get('/name/:category/:keyword',filterByNameController)

router.get('/:category/:keyword',filterByBrandController )



module.exports = router;