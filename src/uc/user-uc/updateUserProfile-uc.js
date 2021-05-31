const User = require('../../entities/user');
const bcryptjs = require('bcryptjs');

async function execute( id,name, lastName,password,email){

    const user = await User.findById(id)
    
    if(user){
        user.name = name || user.name,
        user.lastName = lastName || user.lastName
        if(user.googleEmail === false){
            user.email = email || user.email
        }
        if(password){
            user.password = password
            const salt = bcryptjs.genSaltSync(12);
            user.password = bcryptjs.hashSync(password, salt);
        }
    }
    const userUpdated = await user.save();
    console.log(userUpdated)
    return userUpdated
}
module.exports = execute