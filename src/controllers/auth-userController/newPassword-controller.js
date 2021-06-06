const User = require('../../entities/user');
const bcryptjs = require('bcryptjs');;

async function execute(req,res){

const{email,newPassword}= req.body;
const token = req.header('Authorization')
console.log(token, newPassword)
    if(!token && !newPassword){
        return res.status(400).json({message:'necesitamos el nombre'})
    }
    const user = await User.findOne({email})
    console.log('useremail', user)
    user.password = newPassword
    console.log(user.password)
    const salt = bcryptjs.genSaltSync(12);
    user.password = bcryptjs.hashSync(newPassword, salt);
 
    await user.save()
    const queteden = await User.findOne({email})
    console.log('datos supuestamente guardados',queteden)
    res.status(200).json({ msg: 'Password actualizada',user})  
   
}

module.exports = execute