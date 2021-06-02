const { Router } = require('express');
const {check } = require('express-validator');

const {getCategoryIfExistController,addCategoryController}=require('../controllers')
const {categoryValidator,validateInputs,validateJWT, isAdmin}= require('../middlewares')
const router = Router();

//Add new brand (ADMIN_ROLE) private(TOKEN)
router.post('/',[
     check('categoryName', 'El nombre es obligatorio').not().isEmpty(),
     check('categoryName').custom(categoryValidator),
     validateInputs,
    ],addCategoryController);


router.get('/categoryName/:keyword',[
    validateJWT,
    isAdmin,
],getCategoryIfExistController )

module.exports = router;