const { Router } = require('express');
const {check } = require('express-validator');
const {addOrderProducts,getOrderProductsById,updateStatePaid} = require('../controllers/orderController');
const {validateInputs,validateJWT} = require('../middlewares');
const {getOrdersController} = require('../controllers/index')
const {isOrderValidator} = require('../middlewares')
const router = Router();

router.post('/',[
    validateInputs,
    validateJWT
], addOrderProducts );

router.get('/:id/orderDetail',[
    validateJWT,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(isOrderValidator),
    validateInputs,  
], getOrderProductsById);

router.put('/:id/ispaid',[
    validateJWT,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(isOrderValidator),
    validateInputs
], updateStatePaid);

router.get('/orders',[
    validateJWT,
    check('id').custom(isOrderValidator),
    validateInputs
], getOrdersController)

module.exports = router;
