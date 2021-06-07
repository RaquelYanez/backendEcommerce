const { Router } = require('express');
const {check } = require('express-validator');
const {validateInputs,validateJWT} = require('../middlewares');
const {addOrderProductsController, getAllUserOrdersController,updateOrderToDeliveredController,
    getOneOrderController, getUsersOrdersController,updateStatePaidTrueController,} = require('../controllers')
const {isOrderValidator,isAdmin} = require('../middlewares') 
const router = Router();

router.post('/',[
    validateInputs,
    validateJWT
], addOrderProductsController );

router.get('/:id/orderDetail',[ //cambiar orderDetails
    validateJWT,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(isOrderValidator),
], getOneOrderController);

router.put('/:id/ispaid',[
    validateJWT,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(isOrderValidator),
    validateInputs
], updateStatePaidTrueController);

router.put('/:id/delivered',[ //cambiar a delivered
    validateJWT,
    isAdmin,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(isOrderValidator),
    validateInputs
], updateOrderToDeliveredController);

router.get('/user',[
    validateJWT,
    validateInputs
],getAllUserOrdersController)

router.get('/admin',[
    validateJWT,
    isAdmin,
    validateInputs
],getUsersOrdersController)

module.exports = router;
