const Size  = require('../entities/size');
//POR AHORA ESTA EN PUBLIC

//@desc Anadir una nueva talla
//@route POST /api/size
//@acces private ADMIN
const addSize = async (req,res)=>{
    const {sizeName}   =  req.body;  
    const sizeDB = await Size.findOne({sizeName});
    if(sizeDB){
        return res.status(400).json({msg: `La talla ${sizeDB.sizeName} ya existe.`})
    }
    const size =  new Size({sizeName});
    await size.save();
    res.status(200).json(size);
 
}

module.exports = {addSize}