const { getAllUserOrders } = require('../../../uc');

//@desc mostrrar las userOrders
//@route GET {{url}}/api/order/user
//@acces private ADMIN+USER
async function execute(req,res){
    try {
        const orders = await getAllUserOrders()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({msg:'Error al intentar mostrar los pedidos'})
    }
};

module.exports = execute 