
const rolIsInRoles = require('../middlewares/validate-role');
const isAdmin = require('../middlewares/validate-role')
const validateInputs = require('../middlewares/validator');
const validateJWT = require('../middlewares/validate-jwt');
const brandValidator = require('../middlewares/validate-brand');
const brandProduct = require('../middlewares/validate-productBrand');
const googleValidator = require('../middlewares/validator-google');
const isProductValidator = require('../middlewares/validate-isProduct');
const isOrderValidator = require('../middlewares/validate-hasOrder');

module.exports ={ 
    ...isAdmin,
    ...brandProduct,
    ...rolIsInRoles,
    ...validateInputs,
    ...validateJWT,
    ...brandValidator,
    ...googleValidator,
    ...isProductValidator,
    ...isOrderValidator,
}
