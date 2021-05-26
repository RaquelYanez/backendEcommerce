const { Router } = require('express');
const {check } = require('express-validator');
const {addSize} = require('../controllers/sizeController')

const router = Router();

//Add new brand (ADMIN_ROLE) private(TOKEN)
router.post('/',[ check('sizeName', 'El nombre es obligatorio').not().isEmpty()],addSize);

module.exports = router;