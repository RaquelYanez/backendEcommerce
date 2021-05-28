const { updateUserProfile } = require('../../uc');

//@desc ACTUALIZAR EL PERFIL DE UN USUARIO
//@route PUT /api/user
//@acces private, token
async function execute(req,res){
    const { id } = req.params
    const { _id, password,googleEmail, email, ...newUserbody} = req.body;
    try {
        const userUpdated = await updateUserProfile( id, newUserbody);
        res.json({msg:'Actualizado',userUpdated})   
    } catch (error) {
        res.status(500).json({msg: 'Error al actualizar el perfil'})
    }
}

module.exports = execute