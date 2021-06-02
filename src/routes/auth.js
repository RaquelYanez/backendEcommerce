const { Router } = require('express');
const {check } = require('express-validator');
const {validateInputs,validateJWT} = require('../middlewares');
const {loginController,getUserProfileController,googleLoginController} = require('../controllers')
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
    ], googleLoginController);

module.exports = router;
