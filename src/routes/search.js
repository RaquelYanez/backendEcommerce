const {Router} = require('express');
const router = Router();
const {searchAllProduct,searchByFilter,searchByName,searchByCategory} = require('../controllers/searchController')

router.get('/:collection/:keyword/:filter', searchByFilter) //para cada una de las collections

//para la entrada de los productos 
router.get('/:category/products', searchByCategory)
//bucador por todos los productos
router.get('/:keyword', searchAllProduct)

//para buscar los productos filtrador categoria
router.get('/:category/:keyword', searchByName)

module.exports = router;