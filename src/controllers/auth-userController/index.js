const loginController = require('../auth-userController/login-controller');
const getUserProfileController = require('../auth-userController/getUserProfile-controller')
//const googleLoginController = require('../auth-userController/googleLogin-controller')
const updateUserProfileController = require('../auth-userController/updateUserProfile-controller')
const createNewUserController = require('../auth-userController/signIn-controller')

module.exports ={ 
    loginController,
    getUserProfileController,
                     // googleLoginController,
    updateUserProfileController,
    createNewUserController,

}
