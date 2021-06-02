const Product= require('../../entities/product');
const Category = require('../../entities/category');

//@desc filtrar por categoria 
//@route GET /:category/products
//@acces public
async function execute(req,res){
    const {category} = req.params;
    const regexCategory = new RegExp (category, 'i')
    const pageSize = 5 
    const page = Number(req.query.pageNumber) || 1
    try {
        const categorySelected = await Category.findOne({categoryName:regexCategory}).populate('category')
        if(categorySelected.categoryName === category.toUpperCase()){      
           const product = await Product.find({ category : categorySelected._id})
            .populate('category')
            .populate('brand')
            .populate('sizeProduct.size')
            .select('-user')
            .limit(pageSize).skip(pageSize * (page-1))

        const total = await Product.countDocuments({ category : categorySelected._id})
            .populate('category')
            .populate('brand')
            .populate('sizeProduct.size')
            .select('-user')

           res.status(200).json({  total,product, page, pages: Math.ceil(total / pageSize)})
        }

    }catch (error) {
        res.status(404).json({msg:`No hay productos de con ${regexCategory}`});
    }
}

module.exports = execute 
