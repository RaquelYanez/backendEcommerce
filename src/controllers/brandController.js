const Brand  = require('../entities/brand');

const addBrand = async (req,res) =>{
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
    }
}

module.exports = {addBrand};