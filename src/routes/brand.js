const { Router } = require('express');
const {check} = require('express-validator');
const {validateJWT,validateInputs,brandValidator,isAdmin} = require('../middlewares');

const {addBrand,getAllBrands,deleteBrandById} = require('../controllers/brandController');
const router = Router();


//Add new brand (ADMIN_ROLE) private(TOKEN)
router.post('/',[
    validateJWT,
    isAdmin,
    check('brandName','El nombre de la marca es obligatorio').not().isEmpty(),
    validateInputs,
], addBrand);

//Get all brands = public {{url}}/api/brand
router.get('/',getAllBrands);

//DELETE brand (ADMIN_ROLE) private(TOKEN) "precio/Oferta"
router.delete('/:id',[
    validateJWT,
    isAdmin,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(brandValidator),
    validateInputs
    ],deleteBrandById)







module.exports = router;
