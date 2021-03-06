const Order = require('../../../entities/order');

async function execute(id){
    const order = await Order.findById(id)
        .populate('user', 'name email')
        .populate('orderProducts.product', 'name');
    if(order){
        order.isDelivered = true;  
        order.deliveredDate = Date.now();
    } 
    await order.save();
    return order
};

module.exports = execute 