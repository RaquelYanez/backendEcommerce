const Order = require('../../../entities/order');

async function execute(){
    const orders = await Order.find({isPaid:true})
        .populate('user', 'id name')
        .populate('orderProducts.product', '_id name image price sizeProduct category brand')
        return orders
};

module.exports = execute 