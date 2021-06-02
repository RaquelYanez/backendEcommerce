const {Router} = require('express');
const router = Router();
const {getProductsByCategoryController,filterByBrandController,filterByNameController} = require('../controllers')

//searchAllProduct
//router.get('/:collection/:keyword/:filter', searchByFilter) //para cada una de las collections

//para la entrada de los productos por la categoria
router.get('/:category/products', getProductsByCategoryController)

//bucador por todos los productosfiltrados por la categoria
router.get('/name/:category/:keyword',filterByNameController)

//para buscar los productos por MARCA filterByCategory&Brand   filterByBrandController === searchByName
router.get('/:category/:keyword',filterByBrandController )



module.exports = router;