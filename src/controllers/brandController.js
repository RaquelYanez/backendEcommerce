const Brand  = require('../entities/brand');

//@desc Anadir una nueva marca
//@route POST /api/order
//@acces private ADMIN
const addBrand = async (req,res)=>{
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
}}

//@desc Crear un nuevo pedido
//@route GET /api/brand
//@acces private 
const getAllBrands =   async (req,res ) =>{

    const {limit = 5, offset = 0} = req.query;
    const brands =  await Brand.find()
        .skip(Number(offset)) 
        .limit(Number(limit));
    const totalBrands = await Brand.countDocuments();
    res.status(200).json({totalBrands,brands})
}

//ESTO LO VOY A CAMBIAR PARA MOSTRAR LOS OBJETOS DE ESTA CATEGORIA TODOS
//@desc obtener una marca en concreto
//@route GET /api/brand/:id
//@acces public 
const getBrandById =   async (req,res ) =>{

    const {id} = req.params;
    try {
     const brand =  await Brand.findById(id)
     res.status(200).json({brand})   
    } catch (error) {
    res.status(401).send({msg:'No se ha encontrado esa marca.',err})      
    }
    
}

//@desc obtener una marca en concreto
//@route DELETE /api/brand/:id
//@acces private
const deleteBrandById =   async (req,res ) =>{

    const {id} = req.params;
    try {
        const brand = await Brand.findByIdAndDelete(id); 
        res.status(200).json({msg:`La marca ha sido dada de baja`})   
    } catch (error) {
    res.status(401).send({msg:'No se podido eliminar la marca.',err})      
    }
    
}


module.exports = {addBrand,getAllBrands,getBrandById,deleteBrandById};