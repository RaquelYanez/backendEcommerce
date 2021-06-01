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
const addBrandController = require('../controllers/admin-controller/brand-controller/addBrand-controller')
const createProductController = require('../controllers/admin-controller/product-controller/createOneProduct-controller')
const deleteBrandController = require('../controllers/admin-controller/brand-controller/deleteOneBrand-controller')
const showBrandsController = require('../controllers/admin-controller/brand-controller/getAllBrands-controller')
const updatedProductController =  require('../controllers/admin-controller/product-controller/updateOneProduct-controller')
const createReviewController = require('../controllers/auth-userController/createReview-controller')
const getOrdersController = require('../controllers/auth-userController/getOrders-controller')


module.exports ={ 
    addBrandController,
    createNewUserController,
    createProductController,
    createReviewController,
    deleteAcountController,
    deleteBrandController,
    filterByBrandController,
    filterByNameController,
    topProductsController,
    getOneProductController,
    getOrdersController,
    getProductsByCategoryController,
    getUserProfileController,
    loginController,
     //                googleLoginController,
    showBrandsController,
    updateUserProfileController,
    updatedProductController
   

}
