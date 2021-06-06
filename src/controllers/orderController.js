const { callbackPromise } = require('nodemailer/lib/shared');
const Order  = require('../entities/order');
const Product  = require('../entities/product');
//@desc Crear un nuevo pedido cuando tenemos el carrito, para hacer el pedido
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
    
   // const userId = req.user._id
   // try {
       if(orderProducts && orderProducts.length <= 0){
            res.status(400).json({msg:'El pedido esta vacio, sin productos dentro'})
       }else{
       const order = await new Order({
       // user: userId,
        user:"60aa64884a148d09160bbcd0",
        orderProducts, 
        shippingAddress, 
        paymentMethod, 
        shippingPrice,
        totalPrice,
       });

       const cantBuy = [];
       const isOrderP = await Promise.all(
        orderProducts.map(async (product) => { 
            const productData = await Product.find({$and:[{_id:product.productId}]})
            productData.map(async (item) => {   
                console.log('productoName',item.name)
                item.sizeProduct.map(async(sizes)=>{
                    if(sizes.size == product.sizeId){ //por los campos del id no pilla sino
                        //console.log('tallaSTOCK',sizes.size)
                            if(!(sizes.stock <= product.stock)){
                                cantBuy.push(item.name);
                            }
                    }
                })
            })
        }))
        if(cantBuy.length === 0){
            res.status(200).json({msg:`Pedido realizado con exito `});
        }else{
            res.status(400).json({msg:'Hay productos sin stock suficiente' });
            //res.status(400).json({msg:'Hay productos sin stock suficiente',cantBuy });
        }
        const newOrder = await order.save();
       
    }
  //  } catch (error) {
    //   res.status(500).json({msg:' Error en la creacion del pedido'})  
    //}
}







//@desc Buscar un pedido en concreto por id el usuario puede ver sus detalles de pedido
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

//@desc Actualizar el pedido para cuando "pagamos"
//@route GET /api/order/:id/ispaid
//@acces private
const updateStatePaid =  async (req,res)=>{
    const {id} = req.params

    //con el populate obtenemos el usuario y por otro lado el nombre 
    //y email que es lo que queremos que ser vea
    try {
       const order = await Order.findById(id)
        .populate('user', 'name email')
        .populate('orderProducts.product', 'name');
        if(order){
            order.isPaid = true;
            order.paidDate = Date.now();
            //estos campos vendrian de paypal, osea, que cuando nos logueamos con el senor que te puse en el server ruta de paypal cojamos los valores
//ESTO ESTA EN TESTING tenemos que mirarlo los dos
                order.payStatus = { //estos datos son de paypal
                    id: req.body.id,
                    status:req.body.status, //si es ok que ponga COMPLETADO o algo asi
                    emailPaypal:req.body.payer.emailPaypal//el payer hace referencia en el paypal al "pagador" osea que tendriamos que obtener el correo
            }
        } 
        const updated = await order.save();
        res.json(updated);

    } catch (error) {
        res.status(404).json({msg:' Error en la busqueda del pedido'})  
    }
}

/*

//@desc Buscar todos los pedidos de un usuario
//@route GET /api/order/orders
//@acces private
const getOrders =  async (req,res)=>{
    const {id} = req.params
    try { //aqui si separamos LOS DATOS DEL ENVIO TENGO QUE HACER UN POPULATE
       const orders = await Order.find({user:id})
            .populate('user', 'name email')
            .populate('orderProducts.product', 'name')
            .select('-user');
    
    res.json(orders);

    } catch (error) {
        res.status(404).json({msg:' Error en la busqueda del pedido'})  
    }
}
*/
module.exports = {addOrderProducts,getOrderProductsById,updateStatePaid}