const { Router } = require('express');
const {check} = require('express-validator');
const {validateJWT,validateInputs,brandValidator,isAdmin, brandProduct} = require('../middlewares');
const {deleteBrandController,addBrandController,showBrandsController} = require('../controllers')
const router = Router();

router.get('/',showBrandsController);

router.post('/',[
    validateJWT,
    isAdmin,
    check('brandName','El nombre de la marca es obligatorio').not().isEmpty(),
    validateInputs,
], addBrandController);

router.delete('/:id',[
    check('id').custom(brandProduct),
    validateJWT,
    isAdmin,
    check('id','No es un ID de Mongo').isMongoId(),
    validateInputs
    ],deleteBrandController)

module.exports = router;
