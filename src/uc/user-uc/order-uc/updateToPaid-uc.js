const Order = require('../../../entities/order');

async function execute(id){
    const order = await Order.findById(id)
        .populate('user', 'name email')
        .populate('orderProducts.product', 'name');
    if(order){
        order.isPaid = true;
        order.paidDate = Date.now();
        order.payStatus = { 
            id: req.body.id,
            status:req.body.status, 
            emailPaypal:req.body.payer.emailPaypal
            }
        } 
        const orderIsPaid = await order.save();
        return orderIsPaid
}

module.exports = execute