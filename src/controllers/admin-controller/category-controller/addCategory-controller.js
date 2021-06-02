const {addCategory} = require('../../../uc');

//@desc Para dar de alta una nueva Categoria 'ej: unisex'
//@route POST /api/category
//@acces private ADMIN
async function execute(req,res){
    const {categoryName}   =  req.body;  
    const newCategory =  await addCategory(categoryName)
    res.status(200).json(newCategory);
 
};

module.exports = execute  