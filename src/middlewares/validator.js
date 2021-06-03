const {validationResult } = require('express-validator');

const validateInputs = (req,res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg:'Falla validacion',errors}) 
    }
    next();
}
module.exports = {validateInputs}