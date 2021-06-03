const { deleteProduct } = require('../../../uc');

//@desc Delete product
//@route DELETE /api/product/:id
//@acces private Admin 
async function execute(req,res){
    const {id} = req.params
    try {
        const product = await deleteProduct(id);
        res.json({msg: `Producto eliminado `})  
    } catch (error) {
        res.status(500).json({msg: `No se ha podido eliminar el producto`})
    }
};

module.exports = execute 