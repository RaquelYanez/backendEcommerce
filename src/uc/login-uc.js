const User = require('../entities/user');
const bcryptjs = require('bcryptjs');

async function execute(email,password){

    const user = await User.findOne( { email} );
    if(user){
    const matchPassword = bcryptjs.compareSync( password , user.password);
    if( !matchPassword ){
        return res.status(400).json({ msg: 'User o Password incorrecta -password-'});
    }
    }
    return user
}
module.exports = execute