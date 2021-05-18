const { Router } = require('express');
const {check } = require('express-validator');
const {login,googleLogin} = require('../controllers/authController');
const {validateInputs} = require('../middlewares/validator');

const router = Router();

//PERMITE A LOS USUARIOS INICIAR SESION
router.post('/login',[
    check('email', 'Ingrese el correo').isEmail(),
    check('password', 'Ingrese la password').not().isEmpty(),
    validateInputs
], login );

//INICIAR SESION CON GOOGLE
router.post('/google',[
    check('id_token', 'Token de google necesario').not().isEmpty(),
    validateInputs
], googleLogin );
module.exports = router;
