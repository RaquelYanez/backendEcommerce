const { Router } = require('express');
const {check } = require('express-validator');
const {addSize} = require('../controllers/sizeController')

const router = Router();

//Add new brand (ADMIN_ROLE) private(TOKEN)
router.post('/',[ check('sizeName', 'El nombre es obligatorio').not().isEmpty()],addSize);

const Size  = require('../entities/size');
router.get('/', getSizeName = async function (req,res){
    const sizes = await Size.find({})
    res.status(200).json(sizes)
})
module.exports = router;