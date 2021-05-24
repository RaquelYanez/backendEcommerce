const User = require('../entities/user');
const bcryptjs = require('bcryptjs');
const { createToken} = require('../middlewares/jwt')
const {googleValidator} = require('../middlewares/validator-google')
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
        res.json({msg:'Login success', user, token})

    } catch (err) {
        console.log(err)
        res.status(401).json({
            msg: 'User o Password incorrecta'
        })
        
    }} 
   
//@desc Los users con sesion iniciada pueden ver su perfil
//@route GET /api/auth/:id
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
        res.json({msg:'Login success', user, token})
    } catch (err) {
        console.log(err)
        res.status(401).json({
            msg: 'User o Password incorrecta'
        })
        
    }
   
} 

//@desc Los users con sesion iniciada pueden ver su perfil y eliminarlo despues
//@route GET /api/auth/:id
//@acces private

//ESTOU AQUIIIIII
const getUserProfileAdmin= async (req,res) =>{

    const { email, password } = req.body;

    try { //buscar por email tab
        const user = await User.findOne( { email} );
        if(user){
        const matchPassword = bcryptjs.compareSync( password , user.password);
        if( !matchPassword ){
            return res.status(400).json({ msg: 'User o Password incorrecta -password-'});
        }
        }
        //generar el JWT
        const token = await createToken(user.id);
        res.json(user)

    } catch (err) {
        console.log(err)
        res.status(401).json({
            msg: 'User o Password incorrecta'
        })
        
    }
   
} 

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


module.exports = {login,googleLogin,getUserProfile,getUserProfileAdmin}