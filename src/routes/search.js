const {Router} = require('express');
const router = Router();
const {searchByFilter} = require('../controllers/searchController')

router.get('/:collection/:keyword', searchByFilter) //para cada una de las collections

module.exports = router;