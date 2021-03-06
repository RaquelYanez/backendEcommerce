const { Router } = require('express');
const {check} = require('express-validator');
const {validateJWT,validateInputs,isAdmin, brandProduct} = require('../middlewares');
const {deleteBrandController,addBrandController,showBrandsController, getBrandIfExistController} = require('../controllers')
const router = Router();

router.get('/',showBrandsController);

router.post('/',[
    validateJWT,
    isAdmin,
    check('brandName','El nombre de la marca es obligatorio').not().isEmpty(),
    validateInputs,
], addBrandController);

router.delete('/:id',[
    validateJWT,
    isAdmin,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(brandProduct),
    validateInputs
    ],deleteBrandController)


router.get('/brandName/:keyword',[
    validateJWT,
    isAdmin,
    ],getBrandIfExistController)

module.exports = router;
