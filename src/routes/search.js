const {Router} = require('express');
const router = Router();
const {searchAllProduct,searchByFilter,searchByName} = require('../controllers/searchController')

router.get('/:collection/:keyword/:filter', searchByFilter) //para cada una de las collections
//para buscar los productos fiktrador categoria
router.get('/:category/:keyword', searchByName)

//bucador por todos los productos
router.get('/:keyword', searchAllProduct)

module.exports = router;