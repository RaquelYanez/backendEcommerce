const { Router } = require('express');
const {check } = require('express-validator');
const {getUserProfileAdmin,googleLogin} = require('../controllers/authController');
const {validateInputs,validateJWT,rolIsInRoles} = require('../middlewares');

const {loginController,getUserProfileController,googleLoginController} = require('../controllers')
//googleLoginController
const router = Router();

router.post('/login',[
    check('email', 'Ingrese el correo').isEmail(),
    check('password', 'Ingrese la password').not().isEmpty(),
    validateInputs
], loginController );

router.get('/:id/profile',[
    check('id','No es un ID de Mongo').isMongoId(),
    validateJWT
],
    getUserProfileController ); 

router.post('/google',[
    check('id_token', 'Token de google necesario').not().isEmpty(),
    validateInputs
    ], googleLogin);
//googleLoginController
    



module.exports = router;
