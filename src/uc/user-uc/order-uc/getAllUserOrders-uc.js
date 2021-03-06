const Order = require('../../../entities/order');

async function execute(id){
    const orders = await Order.find({user:id})
        .populate('user', 'id name')
        .populate('orderProducts.product', '_id name image price sizeProduct category brand')
        return orders
};

module.exports = execute 