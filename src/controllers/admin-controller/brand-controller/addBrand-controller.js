const { addBrand } = require('../../../uc');

//@desc Dar de alta una nueva marca
//@route POST /api/brand
//@acces private ADMIN
async function execute(req,res){
    const {brandName}   =  req.body;
    try{     
    const newBrand = await addBrand(brandName)
    res.status(200).json(newBrand);
    }catch(err){
    res.status(400).send({msg:'No se ha podido crear la marca, existe.'})   
}
};

module.exports = execute 