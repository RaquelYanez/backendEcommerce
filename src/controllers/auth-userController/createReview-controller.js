const { createReview } = require('../../uc');

//@desc Hacer un comentario del producto asociado por el id
//@route POST /api/product/:id/review
//@acces private 
async function execute(req,res){
    const {id} = req.params
    const userId = req.user._id
    const userName = req.user.name
    const {rating, comment} = req.body;
    try {
        const product = await createReview(id,userName,userId,rating,comment)
        res.status(200).json({msg:` Hola, ${req.user.name} se ha enviado tu valoracion del producto`})
    }catch (error) {
        res.status(500).json({msg:'La valoracion de este producto ha fallado.'})
    }
    
};

module.exports = execute 