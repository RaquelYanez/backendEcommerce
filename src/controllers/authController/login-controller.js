const { createToken} = require('../../middlewares/jwt');
const {login} = require('../../uc');
//@desc PERMITE A LOS USUARIOS INICIAR SESION
//@route POST /api/auth
//@acces public
async function execute(req,res){
    const { email, password } = req.body;
    try {
        const user = await login(email, password);
        const token = await createToken(user.id);
        res.json({msg:'Login success', user, token})
    } catch (err) {
        console.log(err)
        res.status(401).json({msg: 'User o Password incorrecta'})
    }} 

    module.exports = execute