const Category  = require('../entities/category');

const categoryValidator = async(categoryName) => {
    const isCatetory = await Category.findOne(
        {categoryName:{$regex:categoryName, $options:'i'}})
    if(isCatetory){
        throw new Error(`Esta ${categoryName} categoria ya existe`)
    }
}

module.exports = {categoryValidator}