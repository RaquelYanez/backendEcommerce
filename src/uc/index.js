'use strict';
const login = require('../uc/user-uc/login-uc');
const getProfile = require('../uc/user-uc/getUserProfile-uc');
const googleLogin = require('../uc/user-uc/googleLogin-uc');
const updateUserProfile = require('../uc/user-uc/updateUserProfile-uc');
const newUsersignIn = require('../uc/user-uc/singIn-uc')


module.exports = {
    login,
    getProfile,
    googleLogin,
    updateUserProfile,
    newUsersignIn,
}