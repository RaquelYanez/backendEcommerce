const User = require('../entities/user');
const bcryptjs = require('bcryptjs');
const { createToken} = require('../middlewares/jwt')
const {googleValidator} = require('../middlewares/validator-google')

//LOGIN de un user registrado en GOOGLE
async function execute(req,res){
    const {id_token} = req.body;

   try {
    const {email, lastName, name} = await googleValidator(id_token)  
    let user = await User.findOne( { email} );
        if(!user){
            user = new User({
            name,
            lastName,
            email,
            password:'1234a_A',
            rol:'USER_ROLE',
            googleEmail: true
        });
    await user.save();
    
    }
    const token = await createToken(user.id);
    res.status(200).json({ msg: 'todo ok conectar',user,token})  
    } catch (error) {
        res.status(400).json({msg: 'Token de Google incorrecto'})
    } 
   
}

module.exports = execute