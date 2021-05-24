
const rolIsInRoles = require('../middlewares/validate-role');
const isAdmin = require('../middlewares/validate-role')
const validateInputs = require('../middlewares/validator');
const validateJWT = require('../middlewares/validate-jwt');
const brandValidator = require('../middlewares/validate-brand');

module.exports ={ 
    ...isAdmin,
    ...rolIsInRoles,
    ...validateInputs,
    ...validateJWT,
    ...brandValidator,

}
