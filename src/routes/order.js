const { Router } = require('express');
const {check } = require('express-validator');
const {addOrderProducts,getOrderProductsById,updateStatePaid} = require('../controllers/orderController');
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


module.exports = router;