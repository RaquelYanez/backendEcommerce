const { callbackPromise } = require('nodemailer/lib/shared');
const Order  = require('../entities/order');

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

module.exports = {addOrderProducts,getOrderProductsById,updateStatePaid}