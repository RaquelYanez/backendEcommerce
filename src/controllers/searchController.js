const { compareSync } = require('bcryptjs');
const {Brand,Category,Product } = require('../entities')

const collectionBD = [
    'brands',
    'products',
    'categories'
]


//@desc filtrar por categoria y marca y l apalabra clave
//@route GET /:collection/:keyword/:filter
//@acces public
const searchByFilter= async (req,res) =>{
    const {collection,keyword,filter} = req.params;
    const regexKeyword = new RegExp (keyword, 'i')
    const regexFilter = new RegExp (filter, 'i')
    const pageSize = 5 //cuantos por pagina
    const page = Number(req.query.pageNumber) || 1
    try {
        if(!collectionBD.includes(collection)){
            return res.status(400).json({ msg:`No se puede encontrar nada en ${collection}`});
        }
        const category = await Category.findOne({categoryName:regexKeyword}).populate('category')
        if(category.categoryName === keyword.toUpperCase()){
            const brand = await Brand.findOne({brandName:regexFilter})
            if(brand.brandName === filter.toUpperCase()){
                const product = await Product.find({$and:[{category : category._id},{brand : brand._id}]})
                    .populate('category')
                    .populate('brand')
                    .populate('sizeProduct.size')
                    .select('-user')
                    .limit(pageSize).skip(pageSize * (page-1))
                const total = await Product.countDocuments({$and:[{category : category._id},{brand : brand._id}]})
                res.json({total,product, page, pages: Math.ceil(total / pageSize)}) 
            }
        }
    }catch (error) {
        res.status(404).json({msg:`No hay productos de con ${keyword} con marca ${filter}`});
    }

}


//@desc filtrar por todos los productos de la pagina sin categoria ni nada
//@route GET /:keyword
//@acces public
const searchAllProduct= async (req,res) =>{
   //regex: nos es para que no busque literalmente, sino que busque campos parecidos modo cam de camiseta, camisa...
  //i es para que no sea key INsensitive
    const pageSize = 5 
    const page = Number(req.query.pageNumber) || 1

    const {keyword} = req.query ?{
        name:{
            $regex:req.query.keyword,
            $options: 'i',
        },
    } : {}
    const count = await Product.countDocuments({...keyword})
    const product = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    
    res.json({product, page, pages: Math.ceil(count / pageSize)})
    //obtenemos la pagina que va a ser el recuento de paginas dividido por el tamano de la pagina
}





module.exports = {searchByFilter,searchAllProduct}

