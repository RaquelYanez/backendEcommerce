const { getOneOrder } = require('../../../uc');

//@desc Buscar un pedido en concreto por id 
//@route GET /api/order/:id/orderDetail
//@acces private  user+admin
async function execute(req,res){
    const {id} = req.params
    try {
       const order = await getOneOrder(id)
        if(order === null){
            throw new Error
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({msg:` Error en la busqueda del pedido ${id}`})  
    }
}
module.exports = execute