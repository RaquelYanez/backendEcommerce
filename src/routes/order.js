const { Router } = require('express');
const {check } = require('express-validator');
const {addOrderProducts} = require('../controllers/orderController');
const {validateInputs,validateJWT} = require('../middlewares');


const router = Router();

router.post('/',[
    validateInputs,
    validateJWT
], addOrderProducts );

module.exports = router;
