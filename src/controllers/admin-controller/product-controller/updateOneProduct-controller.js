const { updateProduct } = require('../../../uc');

//@desc Update product
//@route PUT /api/product/:id
//@acces private Admin
async function execute(req,res){
    const {id} = req.params
    const {name,image,color,price,brand,sizeProduct,
        descriptionShort,category} = req.body;
    try {
        const updatedProduct = await updateProduct(name,image,color,price,brand,
            sizeProduct,descriptionShort,category, id)
         res.status(201).json(updatedProduct)
    } catch (error) {
        res.status(500).json({msg:`No se ha podido actualizar el producto ${id}`})  
    }
};

module.exports = execute 