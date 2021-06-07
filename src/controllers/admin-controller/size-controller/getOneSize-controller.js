const {getOneSize} = require('../../../uc');

//@desc Mostrar todas las tallas
//@route GET 'api/size/:id'
//@acces private ADMIN y user
async function execute(req,res){
    const {id} = req.params
    try {
        const size =  await getOneSize(id);
        res.status(200).json(size)    
    } catch (error) {
        res.status(401).json({msg:'Error en la busqueda de las tallas'})    
    }  
};

module.exports = execute 