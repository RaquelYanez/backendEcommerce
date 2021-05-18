const User = require('../entities/user');
const bcryptjs = require('bcryptjs');
const { createToken} = require('../middlewares/jwt')
//LOGIN de un user registrado
const login = async (req,res) =>{

    const { email, password } = req.body;

    try {
        //compruebo que existe el email
        const user = await User.findOne( { email} );
        if( !user ){
            return res.status(400).json({ msg: 'User o Password incorrecta -correo-'});
        }
        //verificar la contrasenha
        const matchPassword = bcryptjs.compareSync( password , user.password);
        if( !matchPassword ){
            return res.status(400).json({ msg: 'User o Password incorrecta -password-'});
        }
        //generar el JWT
        const token = await createToken(user.id);
       
        res.json({msg:'login success', user, token})

    } catch (error) {
        res.status(500).json({
            msg: 'No se ha podido conectar', error
        })
        
    }
   
} 
//LOGIN de un user registrado en GOOGLE
const googleLogin = async (res) =>{
    console.log('dentro del google')
    res.status(200).json({
        msg: 'No se ha podido conectar'
    })
}


module.exports = {login,googleLogin}