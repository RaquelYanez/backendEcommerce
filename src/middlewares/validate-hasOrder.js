const Order  = require('../entities/order');

const isOrderValidator = async(id) => {
    const isOrderValidator = await Order.find(id);
    console.log(isOrderValidator.length)
    if(isOrderValidator.length <= 0){
        throw new Error(`No se encuentra el ningun pedido ${id}`)
    }
}
module.exports = {isOrderValidator}
