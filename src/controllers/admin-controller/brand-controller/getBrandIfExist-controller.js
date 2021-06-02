const {getBrandIfExist} = require('../../../uc');

//@desc Comprobar que existe la marca que pasamos por parametro
//@route GET 'api/brand/brandName/:keyword'
//@acces private ADMIN
async function execute(req,res){
    const {keyword} = req.params;
    try {
        const isBrand =  await getBrandIfExist(keyword);
        if(isBrand === null) {
          throw new Error 
        }
        res.status(200).json(isBrand)    
    } catch (error) {
        res.status(404).json({msg:`Error en la busqueda de la marca, null `})    
    }  
};

module.exports = execute 