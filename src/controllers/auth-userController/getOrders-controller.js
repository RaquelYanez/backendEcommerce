const {getOrders} = require('../../uc')

//@desc Buscar todos los pedidos de un usuario
//@route GET /api/order/orders
//@acces private token
async function execute(req,res){
    const {id} = req.user
    try { 
        const userOrders = await getOrders(id)
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(404).json({msg:' Error en la busqueda del pedido'})  
    }
}
module.exports = execute 