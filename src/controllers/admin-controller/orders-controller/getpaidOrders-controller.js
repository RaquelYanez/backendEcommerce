const { getUsersOrders } = require('../../../uc');

//@desc mostrrar las userOrders
//@route GET {{url}}/api/order/admin
//@acces private ADMIN
async function execute(req,res){
    try {
        const orders = await getUsersOrders()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({msg:'Error al intentar mostrar los pedidos'})
    }
};

module.exports = execute 