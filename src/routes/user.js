const { Router } = require('express');
const {check } = require('express-validator');
const { mailer,usersGet, usuariosDelete } = require('../controllers/usersController');

const {rolIsInRoles, validateInputs, validateJWT,isAdmin} = require('../middlewares');

const {ifEmailExists,userExistsById} = require('../middlewares/dbFunctionsValidator');
const {updateUserProfileController,createNewUserController} = require('../controllers/auth-userController')
const router = Router();


router.get('/', [
    validateJWT,
    isAdmin
],usersGet )

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('email').isEmail().custom(ifEmailExists)
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    check('password', 'La contraseña necesita una minúscula, mayúscula, número y un caracter especial').not().isEmpty()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
   validateInputs,
],createNewUserController);

router.put('/:id',[
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(userExistsById),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('email').isEmail()
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    //one uppercase, one lower case, one special character. 
    check('password', 'La contraseña necesita una minúscula, mayúscula, número y un caracter especial').not().isEmpty()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    validateInputs,
],updateUserProfileController);


router.delete('/:id',[
    validateJWT, //comprobamos que el token sigue siendo valido
    //isAdmin, //middleware para ver si es admin o no
    rolIsInRoles('ADMIN_ROLE'),
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(userExistsById),
    validateInputs,
], usuariosDelete)

//para el email usamos ethereal
router.post('/send-email',mailer)
module.exports = router;