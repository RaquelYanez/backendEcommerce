
const rolIsInRoles = require('../middlewares/validate-role');
const validateInputs = require('../middlewares/validator');
const validateJWT = require('../middlewares/validate-jwt');

module.exports ={ 
    ...rolIsInRoles,
    ...validateInputs,
    ...validateJWT
}
