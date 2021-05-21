const Product  = require('../entities/product');

//@desc coge todos los productos
//@route GET /api/product
//@acces public
const getProducts =  async (req,res)=>{
    try {
        const products = await Product.find({})
        res.json(products)   
    } catch (error) {
        res.status(500).json({msg:' Error en la busqueda'})  
    }
}

//@desc fetch single product
//@route GET /api/product
//@acces public
const getOneProduct = async (req,res)=>{
    const {id} = req.params
    try {
        const product = await Product.findById(id)
        if(product){
          res.json(product) 
        }  
    } catch (err) {

        res.status(404).json({msg:`Producto con id: ${id} encontrado`})  
    }
    
};

module.exports = {getProducts,getOneProduct}