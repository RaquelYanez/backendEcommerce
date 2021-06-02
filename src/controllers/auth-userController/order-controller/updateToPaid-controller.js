const {updateStatePaidTrue} = require('../../../uc')

//@desc Actualizar el pedido para cuando "pagamos"
//@route GET /api/order/:id/ispaid
//@acces private
async function execute(req,res){
    const {id} = req.params
    try {
        const orderIsPaid = await updateStatePaidTrue(id)
        res.status(201).json(orderIsPaid);
    } catch (error) {
        res.status(404).json({msg:' Error en la busqueda del pedido'})  
    }
}

module.exports = execute
