const User = require('../../entities/user');
const {googleValidator} = require('../../middlewares')

async function execute(id_token){ 
const {email, lastName, name} = await googleValidator(id_token)  
const user = await User.findOne( { email} );

if(!user){
 user = new User({
     name,
     lastName,
     email,
     password:' esta password esta almacenada en google ',
     rol:'USER_ROLE',
     googleEmail: true
 })
 await user.save();
}
const token = await createToken(user.id);
return userObject = {user,token}

}

module.exports =execute