const { compareSync } = require('bcryptjs');
const {Brand,Category,Product } = require('../entities')

const collectionBD = [
    'brands',
    'products',
    'categories'
]


//@desc filtrar por categoria y marca
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

//con la paginacion AQUI LUEGO HAY QUE PASAR EL REQ QUERY
//@desc filtrar por categoria y nombre producto paginacion 
//@route GET /:category?keyword
//@acces public
const searchByName= async (req,res) =>{
    const {category} = req.params;
    const {keyword} = req.params;
    const regexCategory = new RegExp (category, 'i')
    const regexKeyword = new RegExp (keyword, 'i')
    const pageSize = 5 //cuantos por pagina
    const page = Number(req.query.pageNumber) || 1
    try {
        const categorySelected = await Category.findOne({categoryName:regexCategory}).populate('category')
        if(categorySelected.categoryName === category.toUpperCase()){      
           const product = await Product.find({ //para contar las respuestas lo mismo pero con el countDocuments
                $or: [{name:regexKeyword}, {descriptionShort:regexKeyword}, {color:regexKeyword}],
                $and:[{category : categorySelected._id}]})
            .populate('category')
            .populate('brand')
            .populate('sizeProduct.size')
            .select('-user')
            .limit(pageSize).skip(pageSize * (page-1))
        
        const total = await Product.countDocuments({ 
            $or: [{name:regexKeyword}, {descriptionShort:regexKeyword}, {color:regexKeyword}],
            $and:[{category : categorySelected._id}]})
            .populate('category')
            .populate('brand')
            .populate('sizeProduct.size')
            .select('-user')
            
           res.status(200).json({ total,product, page, pages: Math.ceil(total / pageSize)})
        }
        
    }catch (error) {
        res.status(404).json({msg:`No hay productos de con ${regexKeyword}`});
    }

}

//@desc filtrar por todos los productos de la pagina
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



//@desc filtrar por categoria y nombre producto paginacion 
//@route GET /:category?keyword
//@acces public
const searchByCategory = async (req,res) =>{
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


module.exports = {searchByFilter,searchByName,searchAllProduct,searchByCategory}

