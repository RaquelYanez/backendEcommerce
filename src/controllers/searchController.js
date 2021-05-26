const {Brand,Category,Product } = require('../entities')

const searchProductsByCategory = async (keyword,res) => {
    const regex = new RegExp (keyword, 'i')
    const category = await Category.findOne({categoryName:regex})
    if(category){
    const product = await Product.find({category : category._id}).populate('category')
    const total = await Product.countDocuments({category : category._id})
    res.json({total,product})
    }
}

const searchProductsByBrand = async (keyword,res) => {
    const regex = new RegExp (keyword, 'i')
    const brand = await Brand.findOne({brandName:regex})
    console.log('brand'+brand)
    if(brand){
    const product = await Product.find({brand : brand._id}).populate('brand')
    const total = await Product.countDocuments({brand : brand._id})
    res.json({total,product})
    }
}

const collectionBD = [
    'brands',
    'categories',
    'products',
]


const searchByFilter= async (req,res) =>{
    const {collection,keyword} = req.params;
    if(!collectionBD.includes(collection)){
        return res.status(400).json({ msg:`No se puede encontrar nada en ${collection}`});
    }
    console.log(collection,keyword)
    await searchProductsByBrand(keyword,res)
}


module.exports = {searchByFilter,searchProductsByCategory}

