const { Router } = require('express');
const {check } = require('express-validator');
const {isAdmin,validateInputs, validateJWT,sizeValidator} = require('../middlewares');
const {getSizesController,addSizeController,getOneSizeController} = require('../controllers')

const router = Router();

//Add new brand puede ser en BM o no, no es Keysensitive la busqueda
router.post('/',[
    validateJWT,
    isAdmin,
    check('sizeName', 'El nombre es obligatorio').not().isEmpty().custom(sizeValidator),
    validateInputs,
],addSizeController);

router.get('/',[
    validateJWT,
    isAdmin,
], getSizesController)

router.get('/:id',[
    //validateJWT,
], getOneSizeController)


module.exports = router;