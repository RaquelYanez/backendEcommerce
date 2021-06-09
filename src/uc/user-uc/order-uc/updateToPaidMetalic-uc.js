const Order = require('../../../entities/order');
const nodemailer = require('nodemailer');

async function execute(id,idUser, email,userName){
    const order = await Order.findById(id)
        .populate('user', 'name email')
        .populate('orderProducts.product', 'name');
    
    if(order){
        order.isPaid = true;
        order.paidDate = Date.now();
        order.payStatus = { 
            id: idUser,
            status: "Esta pagado, pedido en preparacion",
            emailPaypal:email
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
            from: 'Ecommerce-rj <jositoRaquelTfc@gmail.com>',
            to: email, 
            subject: "Muchas gracias por tu pedido",
            text: `Hola, ${userName}, Pedido ${id} esta en preparacion !
      
            Att.JRSports`
            
            }) 
            
        return orderIsPaid
}

module.exports = execute