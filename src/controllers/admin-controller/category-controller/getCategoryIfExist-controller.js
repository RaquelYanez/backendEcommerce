const {getCategoryIfExist} = require('../../../uc');

//@desc Comprobar que existe la marca que pasamos por parametro
//@route GET 'api/brand/brandName/:keyword'
//@acces private ADMIN
async function execute(req,res){
    const {keyword} = req.params;
    try {
        const isCategory =  await getCategoryIfExist(keyword);
        if(isCategory === null) {
            res.status(404).json({msg:`Categoria no encontrada ${isCategory}`, isCategory})
        }
        res.status(200).json(isCategory)    
    } catch (error) {
        res.status(404).json({msg:`Error en la busqueda de la categoria ${keyword}`})    
    }  
};

module.exports = execute 