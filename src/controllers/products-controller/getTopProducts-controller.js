const {getTopProducts}= require('../../uc');

//@desc Hacer el carousel con los detacados
//@route GET /api/product/top
//@acces public 
async function execute(req,res){
//sort es para ordenar ,indicaremos el campo o los campos por los cuales queremos ordenar la consulta
    try {
        const topProduct = await getTopProducts()
        res.status(200).json({topProduct})   
    } catch (error) {
        res.status(500).json({msg:'Error en los detacados.'})
    }   
}

module.exports = execute 