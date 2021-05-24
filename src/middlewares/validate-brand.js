const Brand  = require('../entities/brand');

const brandValidator = async(id) => {
    const isBrand = await Brand.findById(id)
    if(!isBrand){
        throw new Error(`Este id de marca no existe${id}`)
    }
}

module.exports = {brandValidator}