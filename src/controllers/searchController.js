const {Brand,Category,Product } = require('../entities')

const collectionBD = [
    'brands',
    'products',
    'categories'
]


const searchByFilter= async (req,res) =>{
    const {collection,keyword,filter} = req.params;
    const regexKeyword = new RegExp (keyword, 'i')
    const regexFilter = new RegExp (filter, 'i')
    try {
        if(!collectionBD.includes(collection)){
            return res.status(400).json({ msg:`No se puede encontrar nada en ${collection}`});
        }
        const category = await Category.findOne({categoryName:regexKeyword}).populate('category')
        if(category.categoryName === keyword.toUpperCase()){
           // console.log(category.categoryName,keyword.toUpperCase())
            const brand = await Brand.findOne({brandName:regexFilter})
            if(brand.brandName === filter.toUpperCase()){
                //console.log(brand.brandName,filter.toUpperCase())
                const product = await Product.find({$and:[{category : category._id},{brand : brand._id}]}).populate('category').populate('brand')
                res.json(product)
            }
            res.status(404).json({msg:'No existe esa marca'});
        }
    }catch (error) {
        res.status(404).json({msg:`No hay productos en la coleccion ${collection} con categoria ${keyword}`});
    }

}


module.exports = {searchByFilter}

