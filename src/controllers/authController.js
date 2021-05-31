const User = require('../entities/user');
const bcryptjs = require('bcryptjs');
const { createToken} = require('../middlewares/jwt')
const {googleValidator} = require('../middlewares/validator-google')

//LOGIN de un user registrado en GOOGLE
const googleLogin = async (req,res) =>{
   
    const {id_token} = req.body;

   try {
    const {email, lastName, name} = await googleValidator(id_token) 
    //compruebo que no existe el mail en la bd   
    let user = await User.findOne( { email} );
  
   if(!user){
    user = new User({
        name,
        lastName,
        email,
        password:' esta password esta almacenada en google ',
        rol:'USER_ROLE',
        googleEmail: true
    });
    await user.save();
    }
    //generar el JWT
    const token = await createToken(user.id);
    res.status(200).json({ msg: 'todo ok conectar',user,token})  

    } catch (error) {
        res.status(400).json({msg: 'Token de Google incorrecto'})
    } 
   
}


//,getUserProfile googleLogin
module.exports = {googleLogin}