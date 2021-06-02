const {getSizes} = require('../../../uc');

//@desc Mostrar todas las tallas
//@route GET 'api/size/'
//@acces private ADMIN
async function execute(req,res){
    try {
        const sizes =  await getSizes({});
        res.status(200).json(sizes)    
    } catch (error) {
        res.status(401).json({msg:'Error en la busqueda de las tallas'})    
    }  
};

module.exports = execute 