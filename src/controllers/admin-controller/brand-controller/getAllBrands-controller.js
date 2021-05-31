const { showBrands } = require('../../../uc');

//@desc Devuelve todas las marcas
//@route GET /api/brand
//@acces private 
async function execute(req,res){
const brands =  await showBrands()
res.status(200).json({brands})
};

module.exports = execute 