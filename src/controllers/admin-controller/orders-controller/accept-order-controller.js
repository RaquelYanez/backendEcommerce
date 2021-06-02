const { updateOrderToDelivered } = require('../../../uc');

//@desc Actualizar a enviado
//@route PUT /api/order/:id/delivered
//@acces private ADMIN
async function execute(req,res){
    const {id} = req.params
    try { 
        const order = await updateOrderToDelivered(id)
        res.json(order)
    } catch (error) {
        res.status(404).json({msg:' Error en la busqueda del pedido'})  

}
};

module.exports = execute 