const {deleteAcount} = require('../../uc');

//@desc eliminar el perfil de un usuario 
//@route DELETE /api/id
//@acces private,token
async function execute(req,res){
    const { id } = req.params
    try {
        const user = await deleteAcount(id); 
        res.status(200).json({msg:'Se ha eliminado tu cuenta'})
    } catch (error) {
        res.status(500).json({msg: 'Error al intentar borrar la cuenta'})
    }
}

module.exports = execute 