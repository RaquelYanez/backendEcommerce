const { Router } = require('express');
const {check } = require('express-validator');
const {getUserProfileAdmin,googleLogin} = require('../controllers/authController');
const {validateInputs,validateJWT,rolIsInRoles,googleValidator} = require('../middlewares');

const {loginController,getUserProfileController,googleLoginController} = require('../controllers/auth-userController/index')
//googleLogin
const router = Router();

router.post('/login',[
    check('email', 'Ingrese el correo').isEmail(),
    check('password', 'Ingrese la password').not().isEmpty(),
    validateInputs
], loginController );

router.get('/:id/profile',[
    check('id','No es un ID de Mongo').isMongoId(),
    validateJWT],
    getUserProfileController ); 

router.post('/google',[
    googleValidator,
    check('id_token', 'Token de google necesario').not().isEmpty(),
    validateInputs
    ],googleLogin );

    



router.get('admin/:id',[
    validateJWT,
    rolIsInRoles('ADMIN_ROLE')],
    getUserProfileAdmin);


module.exports = router;
