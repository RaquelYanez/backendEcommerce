const Category = require('../../../entities/category');

async function execute(keyword){
    const isCategory =  await Category.findOne(
        {categoryName:{$regex:keyword, $options:'i'}})
    return isCategory
};

module.exports = execute 