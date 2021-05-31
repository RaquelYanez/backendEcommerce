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

module.exports = {
    getTopProducts,
    login,
    filterByBrand,
    filterByName,
    deleteAcount,
    getProfile,
 //   googleLogin,
    updateUserProfile,
    newUsersignUp,
    fetchOne,
    fetchProductsByCategory,

}