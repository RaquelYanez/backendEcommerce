const { Router } = require('express');
const {check } = require('express-validator');
const {validateInputs, validateJWT} = require('../middlewares');
const {ifEmailExists,userExistsById} = require('../middlewares/dbFunctionsValidator');
const {updateUserProfileController,createNewUserController,deleteAcountController} = require('../controllers')

const router = Router();
const {forgotPassword,createNewPassword} = require('../controllers')

router.put('/forgot-password',forgotPassword)
router.put('/new-password', createNewPassword)


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
    validateJWT,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(userExistsById),
    check('email').isEmail()
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    check('password', 'La contraseña necesita una minúscula, mayúscula, número y un caracter especial')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    validateInputs,
],updateUserProfileController);


router.delete('/:id',[
    validateJWT,
    check('id','No es un ID de Mongo').isMongoId(),
    check('id').custom(userExistsById),
    validateInputs,
], deleteAcountController)





module.exports = router;