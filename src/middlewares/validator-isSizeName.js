const Size  = require('../entities/size');

const sizeValidator = async(sizeName) => {
    const isSize = await Size.findOne(
        {sizeName:{$regex:sizeName, $options:'i'}})
    if(isSize){
        throw new Error(`Esta ${sizeName} marca ya existe`)
    }
}

module.exports = {sizeValidator}