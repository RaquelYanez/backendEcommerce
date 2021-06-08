const Order  = require('../../../entities/order');
const Product  = require('../../../entities/product');
const nodemailer = require('nodemailer');

//@desc Crear un nuevo pedido cuando tenemos el carrito,verificando el stock
//@route POST /api/order
//@acces private
async function execute(req,res){
    const { 
        orderProducts, 
        shippingAddress,
        shippingPrice,
        totalPrice,
    } = req.body
    
    const userId = req.user._id
    const {email,name} = req.user
 try {
       if(orderProducts && orderProducts.length <= 0){
            res.status(400).json({msg:'El pedido esta vacio, sin productos dentro'})
       }else{
        const order = await new Order({
        user: userId,
        orderProducts, 
        shippingAddress,  
        shippingPrice,
        totalPrice,
       });

       const cantBuy = [];
       const isOrderP = await Promise.all(
        orderProducts.map(async (product) => { 
            const productData = await Product.find({$and:[{_id:product.productId}]})
            productData.map(async (item) => {   
                item.sizeProduct.map(async(sizes)=>{
                    if(sizes.size == product.sizeId){ 
                        //por los campos del _id de mongo que no los considera == 
                        //al meterlos por postam piensa que es un string no un _id
                        if(sizes.stock < product.qty){
                            cantBuy.push(item.name);
                        }
                        const newStock = sizes.stock-product.qty 
                        await Product.findOneAndUpdate({$and:[{_id:product.productId},{sizeProduct:item.sizeProduct}]})
                        if(sizes.size == product.sizeId){
                            sizes.stock = newStock
                            //console.log('Stock',sizes.size,'es', sizes.stock, )
                            await item.save()
                        }            
                    }
                })
            })
        }))
        if(cantBuy.length === 0){
            await order.save();
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
                subject: `order ${order.id}`,
                text: `Hi,${name}, you will receive the order: ${order.id} in the next few days!

            Att.JRSports`
            })           
            res.status(200).json({msg:`Pedido realizado con exito `});
        }else{
            res.status(400).json({msg:'Hay productos sin stock suficiente' });
            //res.status(400).json({msg:'Hay productos sin stock suficiente',cantBuy });
        }
    }
    } catch (error) {
       res.status(500).json({msg:' Error en la creacion del pedido'})  
    }
}

module.exports =execute