'use strict';
const login = require('../uc/user-uc/login-uc');
const getProfile = require('./user-uc/getUserProfile-uc');
//const googleLogin = require('../uc/user-uc/googleLogin-uc');
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
const getOrders = require('./user-uc/getOrders-uc')

module.exports = {
    addBrand,
    createProduct,
    deleteBrand,
    createReview,
    getTopProducts,
    login,
    showBrands,
    filterByBrand,
    filterByName,
    deleteAcount,
    getProfile,
    getOrders,
 //   googleLogin,
    updateUserProfile,
    updateProduct,
    newUsersignUp,
    fetchOne,
    fetchProductsByCategory,

}