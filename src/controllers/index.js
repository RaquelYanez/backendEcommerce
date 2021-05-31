const loginController = require('../controllers/auth-userController/login-controller');
const getUserProfileController = require('../controllers/auth-userController/getUserProfile-controller')
//const googleLoginController = require('../controllers/auth-userController/googleLogin-controller')
const updateUserProfileController = require('../controllers/auth-userController/updateUserProfile-controller')
const createNewUserController = require('../controllers/auth-userController/signUp-controller')
const deleteAcountController = require('../controllers/auth-userController/deleteUserAcount-controller.js')
const getOneProductController = require('../controllers/products-controller/getOneProduct-controller')
const getProductsByCategoryController = require('../controllers/products-controller/getProductsByCategory-controller')
const topProductsController = require('../controllers/products-controller/getTopProducts-controller')
const filterByBrandController = require('../controllers/search-products-controller/getProductsByCategory&Brand-controller')
const filterByNameController = require('../controllers/search-products-controller/getProductsByCategory&Name-controller')



module.exports ={ 
    filterByBrandController,
    filterByNameController,
    topProductsController,
    getOneProductController,
    getProductsByCategoryController,
    getUserProfileController,
    loginController,
     //                googleLoginController,
    updateUserProfileController,
    createNewUserController,
    deleteAcountController,

}
