const User = require('../../entities/user');

async function execute(id){
    const user = await User.findByIdAndDelete(id);
    return user
}
module.exports = execute