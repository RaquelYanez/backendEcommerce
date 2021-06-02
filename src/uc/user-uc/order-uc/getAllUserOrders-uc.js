const Order = require('../../../entities/order');

async function execute(){
    const orders = await Order.find({})
        .populate('user', 'id name')
        return orders
};

module.exports = execute 