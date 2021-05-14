const { Router } = require('express');
const {check } = require('express-validator');
const {signIn} = require('../controllers/authController');
const {validateInputs} = require('../middlewares/validator');

const router = Router();

router.post('/login',[
    check('email', 'Ingrese el correo').isEmail(),
    check('password', 'Ingrese la password').not().isEmpty(),
    validateInputs
], signIn );

module.exports = router;
