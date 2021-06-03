const { Router } = require('express');
const router = Router();
const {check } = require('express-validator');
const {isAdmin,validateInputs, validateJWT,isProductValidator} = require('../middlewares');
const {getOneProductController,topProductsController,createProductController, updatedProductController,createReviewController,deleteProductController} = require('../controllers')
//publica
//router.get('/',getProducts);

router.get('/top',topProductsController);

//publica
router.get('/:id',[
    check('id','No es un ID de Mongo').isMongoId(),
],getOneProductController,);

router.post('/',[
    validateJWT,
    isAdmin,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('image', 'La imagen es obligatoria').not().isEmpty(),
    check('color', 'El color es obligatorio').not().isEmpty(),
    check('price', 'El price es obligatorio').not().isEmpty(),
    check('sizeProduct', 'El sizeProduct es obligatorio ').not().isEmpty(),
    check('brand', 'La brand es obligatoria').not().isEmpty(),
    check('descriptionShort', 'La descriptionShort es obligatoria').not().isEmpty(),
    check('category', 'La category es obligatoria').not().isEmpty(),
  //  validateInputs,
],createProductController);

router.put('/:id',[
    validateJWT,
    isAdmin,
    check('id','No es un ID de Mongo').isMongoId(),
    validateInputs,
],updatedProductController);

router.post('/:id/review',[
    validateJWT,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(isProductValidator),
    check('rating', 'Tienes que marcar una puntuacion').not().isEmpty(),
    check('comment', 'Tienes que escribir un comentario').not().isEmpty(),
    validateInputs,
],createReviewController);

router.delete('/:id', [
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(isProductValidator),
    validateInputs, 
], deleteProductController)

module.exports = router