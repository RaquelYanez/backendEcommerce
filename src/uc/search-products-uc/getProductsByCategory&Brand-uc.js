const Product = require('../../entities/product');
const Category = require('../../entities/category');
const Brand  = require('../../entities/brand');

async function execute(category,keyword,pageSize,page){
    const categorySelected = await Category.findOne(
        {categoryName:{$regex:category, $options:'i'}})
        .populate('category')
    const keywordSelected = await Brand.findOne(
        {brandName:{$regex:keyword, $options:'i'}})
        .populate('brand')
    if(categorySelected.categoryName === category.toUpperCase()){ 
        const product = await Product.find({
            $or:[{brand:keywordSelected._id}],
            $and:[{category : categorySelected._id}]
            })
        .populate('category')
        .populate('brand')
        .populate('sizeProduct.size')
        .select('-user')
        .limit(pageSize).skip(pageSize * (page-1))
    
   const total = await Product.countDocuments({ 
        $or:[{brand:keywordSelected._id}],
        $and:[{category : categorySelected._id}]
        })
        .populate('category')
        .populate('brand')
        .populate('sizeProduct.size')
        .select('-user')

        const pages =  Math.ceil(total / pageSize) //para devolver el mayor o = del entero dado
        const productObject = { product, total,pages}
        return productObject
        }
}
module.exports = execute 