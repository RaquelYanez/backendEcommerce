const { Router } = require('express');
const {check } = require('express-validator');
const {addOrderProducts,getOrderProductsById} = require('../controllers/orderController');
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
module.exports = router;
