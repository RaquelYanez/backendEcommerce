const User = require('../entities/user');
const bcryptjs = require('bcryptjs');
const { createToken} = require('../middlewares/jwt')

//@desc PERMITE A LOS USUARIOS INICIAR SESION
//@route POST /api/auth
//@acces public
const login = async (req,res) =>{

    const { email, password } = req.body;

    try {
        //compruebo que existe el email
        const user = await User.findOne( { email} );
        if(user){
        //verificar la contrasenha
        const matchPassword = bcryptjs.compareSync( password , user.password);
        if( !matchPassword ){
            return res.status(400).json({ msg: 'User o Password incorrecta -password-'});
        }
        }
        //generar el JWT
        const token = await createToken(user.id);
        res.json({msg:'login success', user, token})

    } catch (err) {
        console.log(err)
        res.status(401).json({
            msg: 'User o Password incorrecta'
        })
        
    }} 
   
//@desc Los users con sesion iniciada pueden ver su perfil
//@route GET /api/auth/profile
//@acces private
const getUserProfile= async (req,res) =>{

    const { email, password } = req.body;

    try {
        //compruebo que existe el email
        const user = await User.findOne( { email} );
        if(user){
        //verificar la contrasenha
        const matchPassword = bcryptjs.compareSync( password , user.password);
        if( !matchPassword ){
            return res.status(400).json({ msg: 'User o Password incorrecta -password-'});
        }
        }
        //generar el JWT
        const token = await createToken(user.id);
        res.json({msg:'login success', user, token})

    } catch (err) {
        console.log(err)
        res.status(401).json({
            msg: 'User o Password incorrecta'
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


module.exports = {login,googleLogin,getUserProfile}