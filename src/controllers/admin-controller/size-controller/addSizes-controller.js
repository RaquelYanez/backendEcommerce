const {addSize} = require('../../../uc');

//@desc dar de alta nuevas tallas
//@route POST 'api/size/'
//@acces private ADMIN
async function execute(req,res){
    const {sizeName}   =  req.body;  
    try {
        const newSize =  await addSize(sizeName);
        res.status(200).json({msg:'Talla creada con exito',newSize})    
    } catch (error) {
        res.status(401).json({msg:'Error en la creacion de las tallas'})    
    }  
};

module.exports = execute 