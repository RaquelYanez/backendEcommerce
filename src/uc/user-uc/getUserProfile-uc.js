const User = require('../../entities/user');

async function execute(id){
    const userProfile = await User.findById(id)
        .select('-userId')
        .select( '-googleEmail')
        .select('-userId')
        .select('-rol');
    return userProfile
}
module.exports = execute