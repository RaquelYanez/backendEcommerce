const { deleteBrand } = require('../../../uc');

//@desc dar de baja una marca
//@route DELETE /api/brand/:id
//@acces private ADMIN
async function execute(req,res){
const {id} = req.params;
    try {
        const deletedBrand = deleteBrand(id);
         res.status(200).json({msg:`La marca ha sido dada de baja`})            
    } catch (error) {
        res.status(401).send({msg:'No se podido eliminar la marca.',error})      
    }
};

module.exports = execute 