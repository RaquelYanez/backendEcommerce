const { Router } = require('express');
const {check } = require('express-validator');
const {addOrderProducts,updateStatePaid} = require('../controllers/orderController');
const {validateInputs,validateJWT} = require('../middlewares');
const { getAllUserOrdersController,updateOrderToDeliveredController,getOneOrderController, updateStatePaidTrueController,} = require('../controllers')
const {isOrderValidator,isAdmin} = require('../middlewares')
const router = Router();

router.post('/',[
    validateInputs,
    validateJWT
], addOrderProducts );

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
], updateStatePaid);

router.put('/:id/delivered',[ //cambiar a delivered
    validateJWT,
    isAdmin,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(isOrderValidator),
    validateInputs
], updateOrderToDeliveredController);

router.get('/user',[
    validateJWT,
    isAdmin,
    validateInputs
],getAllUserOrdersController)

module.exports = router;
