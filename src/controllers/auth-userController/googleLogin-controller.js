const {googleLogin} = require('../../uc');

async function execute(req,res){
    
    const {id_token} = req.body;
    try {
        const userObject = await googleLogin(id_token) ;
        const {user,token} = userObject
        res.status(200).json({ msg: 'todo ok conectar',user,token})  
    } catch (error) {
        res.status(400).json({msg: 'Token de Google incorrecto'})
    }
}

module.exports = execute 