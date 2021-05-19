const jwt = require('jsonwebtoken');
const User = require('../entities/user');

const validateJWT = async( req, res, next ) => {
    //para validar en los headers KEY(authoritation)-VALUE(SECRET_TOKEN ) 'delete'
    //con este nombre es como lo hay que llamar desde el FRONT Authorization
    const token =  req.header('Authorization');

    if( !token){
        //401 sin autorizacion
        return res.status(401).json({ msg:'Peticion sin token'});
    }

    try {

        const secretOrPrivateKey = process.env.SECRET_TOKEN;
        //verificamos el token 
        const { userId } = jwt.verify(token, secretOrPrivateKey);
        //leemos el user
        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({ msg:'El usuario no existe en la BD'});
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg:'El token no es  válido',err})
    }

}
module.exports = {validateJWT}