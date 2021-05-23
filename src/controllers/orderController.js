const Order  = require('../entities/order');

//@desc Crear un nuevo pedido
//@route POST /api/order
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
       if(orderProducts && orderProducts.length === 0){
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
       res.status(201).json(newOrder);

    } catch (error) {
        res.status(500).json({msg:' Error en la creacion del pedido'})  
    }
}

//@desc Buscar un pedido en concreto por id
//@route GET /api/order/:id
//@acces private
const getOrderProductsById =  async (req,res)=>{
    const {id} = req.params
    //con el populate obtenemos el usuario y por otro lado el nombre 
    //y email que es lo que queremos que ser vea
    try {
       const order = await Order.findById(id).populate('user', 'name email').populate('orderProducts.product', 'name');
        if(order){
            res.json(order);
        } 

    } catch (error) {
        res.status(404).json({msg:' Error en la busqueda del pedido'})  
    }
}
module.exports = {addOrderProducts,getOrderProductsById}