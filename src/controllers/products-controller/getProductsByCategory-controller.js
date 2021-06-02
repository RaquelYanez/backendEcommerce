//@desc filtrar por categoria 
//@route GET /:category/products
//@acces public
async function execute(req,res){
    const {category} = req.params;
    const regexCategory = new RegExp (category, 'i')
    const pageSize = 5 //es e limit
    const page = Number(req.query.pageNumber) || 1 //?pageNumber=1 si no lo pasamos estamos en la `1
    try {
        const categorySelected = await Category.findOne({categoryName:regexCategory}).populate('category')
        if(categorySelected.categoryName === category.toUpperCase()){   
            const product = await Product.find({
                $or: [{name:regexCategory}], 
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
        const pages =  Math.ceil(total / pageSize) //para devolver el mayor o = del entero dado
        res.status(200).json({ total, pages,page,product})
        }

    }catch (error) {
        res.status(404).json({msg:`No hay productos de con ${regexCategory}`});
    }
}

module.exports = execute 
