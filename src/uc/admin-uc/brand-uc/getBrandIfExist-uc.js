const Brand = require('../../../entities/brand');

async function execute(keyword){
    const isBrand = await Brand.findOne(
        {brandName:{$regex:keyword, $options:'i'}})

    return isBrand  
};

module.exports = execute 