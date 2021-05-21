const { Router } = require('express');
const {check} = require('express-validator');
const {validateJWT,validateInputs} = require('../middlewares');
const {addBrand} = require('../controllers/brandController');
const router = Router();
const Brand  = require('../entities/brand');


//Add new brand (ADMIN_ROLE) private(TOKEN)
router.post('/',[
    validateJWT,
    check('brandName','El nombre de la marca es obligatorio').not().isEmpty(),
    validateInputs,
], addBrand);


router.post('/s',async (req,res)=>{
    const {brandName}   =  req.body;
    try{     
    const brandDB = await Brand.findOne({brandName});
    if(brandDB){
        return res.status(400).json({msg: `La categoria ${brandDB.brandName} ya existe.`})
    }
    const brand =  new Brand({brandName});
    await brand.save();
    res.status(200).json(brand);
    }catch(err){
    res.status(400).send({msg:'No se ha podido crear la marca.',err})   
}})


//Get all brands = public {{url}}/api/brand
router.get('/',(req,res)=>{res.json('get')})

//Get One brand by id/name
router.get('/:id',(req,res)=>{res.json('get')})


//UPDATE brand (ADMIN_ROLE) private(TOKEN) "precio/Oferta"
router.put('/:id',(req,res)=>{res.json('put')})

//DELETE brand (ADMIN_ROLE) private(TOKEN) "precio/Oferta"
router.delete('/:id',(req,res)=>{res.json('delete')})







module.exports = router;
