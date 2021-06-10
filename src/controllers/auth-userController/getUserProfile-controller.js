const { getProfile } = require('../../uc');

//@desc Los users con sesion iniciada pueden ver su perfil
//@route GET /api/auth/:id
//@acces private, va con token
async function execute(req,res){
    try {
        const { id } = req.params
        const userProfile =  await getProfile(id)
        res.status(200).json(userProfile)
    }catch(err){
        res.status(500).json({msg: 'Error al intentar buscar el perfil de user',err})
    }
    } 
    module.exports = execute
