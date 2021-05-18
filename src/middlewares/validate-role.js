
//comprobar que es un ADMINISTRADOR despues de validar el token
const isAdmin = (req,res,next) =>{

    if(!req.user){
        return res.status(500).json({msg: 'Fallo al validar el token, validarlo primero'});
    }
    const { rol,name } = req.user;
   
    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({msg: `${name} no tienes permiso para eliminar usuarios`})
    }
    next();
}

const rolIsInRoles = (...item) =>{
    return (req,res,next) =>{
        if(!req.user){
            return res.status(500).json({msg: 'Fallo al validar el token, validarlo primero'});
        } 
    
    if(!item.includes(req.user.rol)){
        return res.status(401).json({msg: `Para eliminar usuarios necesitas ser ${item}`})
    }
    next();
}
}

module.exports = { isAdmin, rolIsInRoles}