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


    const Brand  = require('../entities/brand');
router.get('/brandName/:keyword', getBrandByName = async function (req,res){
    const {keyword} = req.params;
    const brandSelected = await Brand.findOne(
        {brandName:{$regex:keyword, $options:'i'}})
        res.status(200).json(brandSelected)
})
module.exports = router;
