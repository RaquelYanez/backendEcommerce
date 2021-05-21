const Order  = require('../entities/order');

//@desc Crear un nuevo pedido
//@route GET /api/orders
//@acces private
const addOrderProducts =  async (req,res)=>{
    const { 
        orderProducts,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        totalPrice,
    } = req.body
    const userId = req.user._id
    try {
       if(orderProducts && orderProducts.length ===0){
           res.status(400).json({msg:'El pedido esta vacio, sin productos dentro'})
       }
       const order = await new Order({
        user: userId,
        orderProducts,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        totalPrice,
       });
       const newOrder = await order.save();
       res.status(201).json(newOrder)

    } catch (error) {
        res.status(500).json({msg:' Error en la creacion del pedido'})  
    }
}

module.exports = {addOrderProducts}