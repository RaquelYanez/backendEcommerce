const { Router } = require('express');
const {check } = require('express-validator');
const {getUserProfile,googleLogin,getUserProfileAdmin} = require('../controllers/authController');
const {validateInputs,validateJWT,rolIsInRoles,googleValidator} = require('../middlewares');
//login,
const {loginController} = require('../controllers/authController/index')

const router = Router();

router.post('/login',[
    check('email', 'Ingrese el correo').isEmail(),
    check('password', 'Ingrese la password').not().isEmpty(),
    validateInputs
], loginController );


router.get('/:id',[
    validateJWT],
    getUserProfile );

router.get('/:id',[
    validateJWT,
    rolIsInRoles('ADMIN_ROLE')],
    getUserProfileAdmin);

//INICIAR SESION CON GOOGLE hacemos obligatorio el idtoken de oogle
router.post('/google',[
    googleValidator,
    check('id_token', 'Token de google necesario').not().isEmpty(),
    validateInputs
],
    googleLogin );
module.exports = router;
