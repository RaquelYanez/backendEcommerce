const { Router } = require('express');
const {check } = require('express-validator');
const {addCategory} = require('../controllers/categoryController')


const router = Router();

//Add new brand (ADMIN_ROLE) private(TOKEN)
router.post('/',[ check('categoryName', 'El nombre es obligatorio').not().isEmpty(),],addCategory);

module.exports = router;