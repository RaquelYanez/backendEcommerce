const Brand = require('../../../entities/brand');
//const Product = require('../../../entities/brand');

async function execute(id){ 

const deletedBrand = await Brand.findOneAndDelete({_id:id}); 
return deletedBrand  
};

module.exports = execute 