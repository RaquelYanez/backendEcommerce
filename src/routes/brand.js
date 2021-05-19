const { Router } = require('express');
const {check} = require('express-validator');
const {validateJWT,validateInputs} = require('../middlewares');
const {addBrand} = require('../controllers/brandController');
const router = Router();


//Add new brand (ADMIN_ROLE) private(TOKEN)
router.post('/',[
    validateJWT,
    check('brandName','El nombre de la marca es obligatorio').not().isEmpty(),
    validateInputs,
], addBrand);

//Get all brands = public {{url}}/api/brand
router.get('/',(req,res)=>{res.json('get')})

//Get One brand by id/name
router.get('/:id',(req,res)=>{res.json('get')})


//UPDATE brand (ADMIN_ROLE) private(TOKEN) "precio/Oferta"
router.put('/:id',(req,res)=>{res.json('put')})

//DELETE brand (ADMIN_ROLE) private(TOKEN) "precio/Oferta"
router.delete('/:id',(req,res)=>{res.json('delete')})







module.exports = router;
