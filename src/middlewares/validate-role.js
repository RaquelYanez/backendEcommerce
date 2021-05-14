

const isAdmin = (req,res,next) =>{

    if(!req.usuario){
        return res.status(500).json({msg: 'Fallo al validar el token'})
    }

    const{rol,name} = req.user;
    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({msg: `${name} no tienes permiso para eliminar usuarios`})
    }
    next();
}

module.exports = { isAdmin}