const Brand = require('../../../entities/brand');

async function execute(brandName){
    const newBrand =  new Brand({brandName:brandName});
    await newBrand.save();
    return newBrand  
};

module.exports = execute 