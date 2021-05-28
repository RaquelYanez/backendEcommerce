const User = require('../../entities/user');

async function execute(id,_id, password,googleEmail, email, ...newUserbody){
    if(password){
        const salt = bcryptjs.genSaltSync(12);
        newUserbody.password = bcryptjs.hashSync(password, salt);  
    }
const userUpdated = await User.findByIdAndUpdate( id, newUserbody);
return userUpdated
}
module.exports = execute