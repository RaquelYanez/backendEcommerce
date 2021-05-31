const User = require('../../entities/user');
const bcryptjs = require('bcryptjs');

async function execute(name, lastName, email, password, rol){
    const user =  new User({
        name,
        lastName,
        email,
        password,
        rol: rol || 'USER_ROLE',
        });
    const salt = bcryptjs.genSaltSync(12);
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    return user
}
module.exports = execute