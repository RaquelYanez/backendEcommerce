const loginController = require('../controllers/auth-userController/login-controller');
const getUserProfileController = require('../controllers/auth-userController/getUserProfile-controller')
const googleLoginController = require('../controllers/google-controller')
const updateUserProfileController = require('../controllers/auth-userController/updateUserProfile-controller')
const createNewUserController = require('../controllers/auth-userController/signUp-controller')
const deleteAcountController = require('../controllers/auth-userController/deleteUserAcount-controller.js')
const getOneProductController = require('../controllers/products-controller/getOneProduct-controller')
const getProductsByCategoryController = require('../controllers/products-controller/getProductsByCategory-controller')
const topProductsController = require('../controllers/products-controller/getTopProducts-controller')
const filterByBrandController = require('../controllers/search-products-controller/getProductsByCategory&Brand-controller')
const filterByNameController = require('../controllers/search-products-controller/getProductsByCategory&Name-controller')
const addBrandController = require('../controllers/admin-controller/brand-controller/addBrand-controller')
const addSizeController = require('../controllers/admin-controller/size-controller/addSizes-controller')
const createProductController = require('../controllers/admin-controller/product-controller/createOneProduct-controller')
const deleteBrandController = require('../controllers/admin-controller/brand-controller/deleteOneBrand-controller')
const showBrandsController = require('../controllers/admin-controller/brand-controller/getAllBrands-controller')
const updatedProductController =  require('../controllers/admin-controller/product-controller/updateOneProduct-controller')
const createReviewController = require('../controllers/auth-userController/createReview-controller')
const getBrandIfExistController = require('../controllers/admin-controller/brand-controller/getBrandIfExist-controller')
const getSizesController = require('../controllers/admin-controller/size-controller/getSizes-controller')
const getCategoryIfExistController = require('../controllers/admin-controller/category-controller/getCategoryIfExist-controller')
const addCategoryController = require('../controllers/admin-controller/category-controller/addCategory-controller')
const getAllUserOrdersController = require('./auth-userController/order-controller/getAllUserOrders-controller')
const updateStatePaidTrueController = require('./auth-userController/order-controller/updateToPaid-controller')
const updateOrderToDeliveredController = require('../controllers/admin-controller/orders-controller/accept-order-controller')
const getOneOrderController = require('../controllers/auth-userController/order-controller/getOrderDetails-controller')
const deleteProductController = require('../controllers/admin-controller/product-controller/deleteOneProduct-controller')
const addOrderProductsController = require('../controllers/auth-userController/order-controller/addOrderProducts-controller')
const getUsersOrdersController = require('../controllers/admin-controller/orders-controller/getpaidOrders-controller')
const getOneSizeController = require('../controllers/admin-controller/size-controller/getOneSize-controller')

const forgotPassword = require('../controllers/auth-userController/forgotPassword-controller')
const createNewPassword =require('../controllers/auth-userController/newPassword-controller')

module.exports ={ 
    addBrandController,
    addCategoryController,
    addSizeController,
    addOrderProductsController,
    createNewUserController,
    createProductController,
    createReviewController,
    deleteAcountController,
    deleteBrandController,
    deleteProductController,
    filterByBrandController,
    filterByNameController,
    topProductsController,
    getAllUserOrdersController,
    getBrandIfExistController,
    getCategoryIfExistController,
    getOneProductController,
    getOneOrderController,
    getProductsByCategoryController,
    getSizesController,
    getUserProfileController,
    loginController,             
    showBrandsController,
    updateUserProfileController,
    updatedProductController,
    updateOrderToDeliveredController,
    updateStatePaidTrueController,
    googleLoginController,
    getUsersOrdersController,
    getOneSizeController,

    forgotPassword,
    createNewPassword,

}
