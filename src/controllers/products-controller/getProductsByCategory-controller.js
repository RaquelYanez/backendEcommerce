const { fetchProductsByCategory  } = require('../../uc');

//@desc filtrar por categoria 
//@route GET /:category/products
//@acces public
async function execute(req,res){
    const {category} = req.params;
    const regexCategory = new RegExp (category, 'i')
    const pageSize = 5 //es e limit
    const page = Number(req.query.pageNumber) || 1 //?pageNumber=1 si no lo pasamos estamos en la `1
    try {
        const productObject = await fetchProductsByCategory(category,regexCategory,pageSize)
        const {product,total,pages} = productObject
        res.status(200).json({ total, pages,page,product})

    }catch (error) {
        res.status(404).json({msg:`No hay productos de con ${regexCategory}`});
    }
}
module.exports = execute 