const Order = require('../../../entities/order');

async function execute(id){
    const order = await Order.findById(id)
        .populate('user', 'name email')
        .populate('orderProducts.product', 'name');
    return order
}
module.exports = execute