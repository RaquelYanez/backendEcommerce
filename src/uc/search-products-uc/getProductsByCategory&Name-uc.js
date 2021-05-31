const Product = require('../../entities/product');
const Category = require('../../entities/category');

async function execute(category,keyword,pageSize,page){
    const categorySelected = await Category.findOne(
        {categoryName:{$regex:category, $options:'i'}})
        .populate('category')
    if(categorySelected.categoryName === category.toUpperCase()){  
        const keywordSelected = {$regex:keyword, $options:'i'}
        const product = await Product.find({
            $or: [{name:keywordSelected}], 
            $and:[{category : categorySelected._id}]})
        .populate('category')
        .populate('brand')
        .populate('sizeProduct.size')
        .select('-user')
        .limit(pageSize).skip(pageSize * (page-1))
    
        const total = await Product.countDocuments({ 
        $or: [{name:keywordSelected}], 
        $and:[{category : categorySelected._id}]})
        .populate('category')
        .populate('brand')
        .populate('sizeProduct.size')
        .select('-user')

        const pages =  Math.ceil(total / pageSize) 
        const productObject = { product, total,pages}
        return productObject
        }
   }
        
module.exports = execute 