'use strict';
const login = require('../uc/user-uc/login-uc');
<<<<<<< HEAD
const getProfile = require('./user-uc/getUserProfile-uc');
const updateUserProfile = require('./user-uc/updateUserProfile-uc');
const newUsersignUp = require('./user-uc/singUp-uc');
const deleteAcount = require('./user-uc/deleteUserAcount-uc');
const fetchOne = require('./products-uc/getOneProduct-uc');
const fetchProductsByCategory = require('./products-uc/getProductsByCategory-uc');
const getTopProducts = require('./products-uc/getTopProducts-uc');
const filterByBrand = require('./search-products-uc/getProductsByCategory&Brand-uc');
const filterByName = require('./search-products-uc/getProductsByCategory&Name-uc');
const addBrand = require('./admin-uc/brand-uc/addBrand-uc');
const createProduct = require('./admin-uc/product-uc/createOneProduct-uc');
const deleteBrand = require('./admin-uc/brand-uc/deleteOneBrand-uc');
const showBrands = require('./admin-uc/brand-uc/getAllBrands-uc');
const updateProduct = require('./admin-uc/product-uc/updateOneProduct-uc');
const createReview = require('./user-uc/createReview-uc')
const getBrandIfExist = require('./admin-uc/brand-uc/getBrandIfExist-uc')
const getCategoryIfExist = require('./admin-uc/category-uc/getCategoryIfExist-uc')
const getSizes = require('./admin-uc/size-uc/getSizes-uc')
const addSize = require('./admin-uc/size-uc/addSizes-uc')
const addCategory = require('./admin-uc/category-uc/addCategory-uc')
const getAllUserOrders = require('./user-uc/order-uc/getAllUserOrders-uc')
const updateStatePaidTrue = require('./user-uc/order-uc/updateToPaid-uc')
const updateOrderToDelivered = require('./admin-uc/orders-uc/accept-order-uc')
const deleteProduct = require('./admin-uc/product-uc/deleteOneProduct-uc')
const getOneOrder = require('./user-uc/order-uc/getOrderDetails-uc')
=======
const getProfile = require('../uc/user-uc/getUserProfile-uc');
const googleLogin = require('../uc/user-uc/googleLogin-uc');
const updateUserProfile = require('../uc/user-uc/updateUserProfile-uc');
const newUsersignIn = require('../uc/user-uc/singIn-uc')

>>>>>>> parent of 80a32c6... fuera google

module.exports = {
    addBrand,
    addCategory,
    addSize,
    createProduct,
    deleteBrand,
    deleteProduct,
    createReview,
    getTopProducts,
    login,
    showBrands,
    filterByBrand,
    filterByName,
    deleteAcount,
    getAllUserOrders,
    getBrandIfExist,
    getCategoryIfExist,
    getOneOrder,
    getProfile,
<<<<<<< HEAD
    getSizes,
=======
    googleLogin,
>>>>>>> parent of 80a32c6... fuera google
    updateUserProfile,
    updateProduct,
    newUsersignUp,
    fetchOne,
    fetchProductsByCategory,
    updateOrderToDelivered,
    updateStatePaidTrue,
}