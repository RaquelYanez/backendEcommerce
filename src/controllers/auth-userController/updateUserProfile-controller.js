const { updateUserProfile, getProfile } = require('../../uc');

//@desc ACTUALIZAR EL PERFIL DE UN USUARIO
//@route PUT /api/user
//@acces private, token
async function execute(req,res){
    const {id}= req.params
    const { name, lastName,password, email} = req.body;
    try {
        const user = await getProfile(id);
        if(user){
            const userUpdated = await updateUserProfile(id,name, lastName,password,email);
            res.json({msg:'Actualizado',userUpdated})
        } 
    } catch (error) {
        res.status(500).json({msg: 'Error al actualizar el perfil'})
    }
}

module.exports = execute