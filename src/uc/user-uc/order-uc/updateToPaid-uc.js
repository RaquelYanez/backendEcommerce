const Order = require('../../../entities/order');

async function execute(id,idUser, userName, email){
    const order = await Order.findById(id)
        .populate('user', 'name email')
        .populate('orderProducts.product', 'name');
    if(order){
        order.isPaid = true;
        order.paidDate = Date.now();
        order.payStatus = { 
            id: idUser,
            status:req.body.status, 
            emailPaypal:req.body.emailPaypal
            }
        } 
        const orderIsPaid = await order.save();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: { 
              user: 'jositoRaquelTfc@gmail.com',
              pass:'mnpcrkceaakbutrm',
            }
          })
        await transporter.sendMail({
            from: 'Order placed successfully! - Ecommerce-rj <jositoRaquelTfc@gmail.com>',
            to: email, 
            subject: `order ${id}`,
            text: `Hi,${userName}, you will receive the order: ${id} in the next few days!

        Att.JRSports`

        })      
        return orderIsPaid
}

module.exports = execute