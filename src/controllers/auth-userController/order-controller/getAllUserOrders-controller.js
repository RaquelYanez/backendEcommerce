const { getAllUserOrders } = require('../../../uc');

//@desc mostrrar las userOrders
//@route GET {{url}}/api/order/user
//@acces private USER
async function execute(req,res){
    const {id} = req.user
    try {
        const orders = await getAllUserOrders(id)
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({msg:'Error al intentar mostrar los pedidos'})
    }
};

module.exports = execute 