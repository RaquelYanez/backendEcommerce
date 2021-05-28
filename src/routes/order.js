const { Router } = require('express');
const {check } = require('express-validator');
const {addOrderProducts,getOrderProductsById,updateStatePaid,getOrders} = require('../controllers/orderController');
const {validateInputs,validateJWT} = require('../middlewares');


const router = Router();

router.post('/',[
    validateInputs,
    validateJWT
], addOrderProducts );

router.get('/:id',[
    validateInputs,
    validateJWT
], getOrderProductsById);

router.put('/:id/ispaid',[
    validateInputs,
    validateJWT
], updateStatePaid);

router.get('/:id/orders',[
    validateJWT,
    validateInputs
], getOrders)

module.exports = router;
