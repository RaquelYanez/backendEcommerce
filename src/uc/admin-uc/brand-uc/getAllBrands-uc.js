const Brand = require('../../../entities/brand');

async function execute(){
    const brands =  await Brand.find({})
    return brands
}; 

module.exports = execute 