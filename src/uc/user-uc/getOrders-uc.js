const Order = require('../../entities/order')

async function execute(id){
    const userOrders = await Order.find({user:id})
        .populate('user', 'name email')
        .populate('orderProducts.product', 'name')
        .select('-user');
    return userOrders
}
module.exports = execute 