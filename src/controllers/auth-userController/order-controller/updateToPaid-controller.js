const {updateStatePaidTrue} = require('../../../uc')

//@desc Actualizar el pedido para cuando "pagamos"
//@route GET /api/order/:id/ispaid
//@acces private
async function execute(req,res){
    const {id} = req.params
    const {idUser, userName, email,status,emailPaypal} = req.body


    try {
        const orderIsPaid = await updateStatePaidTrue(id,idUser, userName, email,status,emailPaypal)
        res.status(200).json({msg:'Todo okey',orderIsPaid});
    } catch (error) {
    res.status(500).json({msg:' Error en la busqueda del pedido'})  
    }
       
}



module.exports = execute
