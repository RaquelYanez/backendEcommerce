const { fetchOne } = require('../../uc');

//@desc fetch single product
//@route GET /api/product
//@acces public
async function execute(req,res){
    const {id} = req.params
     try {
        const product = await fetchOne(id);
        if(product){
          res.status(200).json(product) 
        }  
    } catch (err) {
        res.status(404).json({msg:`Producto con id: ${id} no encontrado`})  
    }
};

module.exports = execute 