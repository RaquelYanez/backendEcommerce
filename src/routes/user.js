const { Router } = require('express');
const {check } = require('express-validator');
const { usuariosGet, userPut, signUp, usuariosDelete,
       usuariosPatch } = require('../controllers/usersController');
const {isAdmin} = require('../middlewares/validate-role');
const {validateInputs} = require('../middlewares/validator');
const {validateJWT} = require('../middlewares/validate-jwt');
const {isValidRole,ifEmailExists,userExistsById} = require('../middlewares/dbFunctionsValidator');

const router = Router();
//primerEjemplo de paginacion para repsar en productos
router.get('/', usuariosGet )

router.put('/:id',[
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(userExistsById),
    //FALTA VALIDAD EL CP...
    check('phone', 'Inserte un número de telefono correcto').isLength({ min: 9, max:9 })
    .matches(/^[0-9-]+$/),
    validateInputs,
], userPut )

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('email').isEmail().custom(ifEmailExists)
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    //one uppercase, one lower case, one special character. 
    check('password', 'La contraseña necesita una minúscula, mayúscula, número y un caracter especial').not().isEmpty()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    //FALTA VALIDAR EDAD
    check('birthdate', 'Tienes que ser mayor de edad').isDate(),
    //FALTA VALIDAD EL CP...
   // check('rol').custom(isValidRole),
    check('phone', 'Inserte un número de telefono correcto').isLength({ min: 9, max:9 })
    .matches(/^[0-9-]+$/),
   validateInputs,
    
],signUp);

router.delete('/:id',[
    validateJWT, //comprobamos que el token sigue siendo valido
    //isAdmin, //middleware para ver si es admin o no
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(userExistsById),
    validateInputs,
], usuariosDelete)
router.patch('/', usuariosPatch )

module.exports = router;