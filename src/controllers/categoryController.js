const Category  = require('../entities/category');
//POR AHORA ESTA EN PUBLIC

//@desc Anadir una nueva categoria
//@route POST /api/category
//@acces private ADMIN
const addCategory = async (req,res)=>{
    const {categoryName}   =  req.body;  
    const categoryDB = await Category.findOne({categoryName});
    if(categoryName){
        return res.status(400).json({msg: `La categoria ${categoryDB.categoryName} ya existe.`})
    }
    const category =  new Category({categoryName});
    await category.save();
    res.status(200).json(category);
 
}

module.exports = {addCategory}