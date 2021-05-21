const { Router } = require('express');
const {check } = require('express-validator');
const {login,getUserProfile,googleLogin} = require('../controllers/authController');
const {validateInputs,validateJWT} = require('../middlewares');


const router = Router();

router.post('/login',[
    check('email', 'Ingrese el correo').isEmail(),
    check('password', 'Ingrese la password').not().isEmpty(),
    validateInputs
], login );


router.get('/:id',[validateJWT], getUserProfile );

//INICIAR SESION CON GOOGLE
router.post('/google',[
    check('id_token', 'Token de google necesario').not().isEmpty(),
    validateInputs
], googleLogin );
module.exports = router;
