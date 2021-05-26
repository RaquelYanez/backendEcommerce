const { Router } = require('express');
const router = Router();
const {check } = require('express-validator');
const {getProducts,getOneProduct,createOneProduct,updateProduct,createReviewToOneProduct,searchProduct} = require('../controllers/productController');

const {isAdmin,validateInputs, validateJWT} = require('../middlewares');


/*si istalamos el i express-async-hander no tengo que hacer el trycath en cada uno de ellos

//get all products
const asyncHandler = require('express-async-handler');
router.get('/', asyncHandler(async (req,res)=>{
    const products = await Product.find({})
    res.json(products)
}));
*/
//publica
router.get('/',getProducts);
//publica
router.get('/:id',[
    check('id','No es un ID de Mongo').isMongoId(),
],getOneProduct);


//privada token ADMIN
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
    validateInputs,
],createOneProduct);

//privada token ADMIN
router.put('/:id',[
    validateJWT,
    isAdmin,
    check('id','No es un ID de Mongo').isMongoId(),
    validateInputs,
],updateProduct);

//privada token
router.post('/:id/review',[
    validateJWT,
    check('id','No es un ID de Mongo').isMongoId(),
    check('rating', 'Tienes que marcar una puntuacion').not().isEmpty(),
    //check('comment', 'Tienes que escribir un comentario').not().isEmpty(),
    validateInputs,
],createReviewToOneProduct);

module.exports = router