const Category  = require('../../../entities/category');

async function execute(categoryName){
    const newCategory =  new Category({categoryName});
    await newCategory.save();
    return newCategory
}

module.exports = execute