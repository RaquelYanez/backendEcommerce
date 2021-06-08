const {paidWithMoney} = require('../../../uc')

//@desc Actualizar el pedido para cuando "pagamos" metalico
//@route GET /api/order/:id/ispaid/money
//@acces private
async function execute(req,res){
    const {id} = req.params
    const idUser = req.user.id
    const userName = req.user.name
    const {email} = req.user
    try {
        const orderIsPaid = await paidWithMoney(id,idUser, email,userName)
        res.status(201).json(orderIsPaid);
    } catch (error) {
        res.status(404).json({msg:' Error en la busqueda del pedido'})  
    }
}

module.exports = execute