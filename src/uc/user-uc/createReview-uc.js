const Product = require('../../entities/product');

async function execute(id,userName,userId,rating,comment){
    const product = await Product.findById({_id:id});
    //const alredyDoReview = product.reviews.find(review => review.user.toString() === userId.toString());
    //if(alredyDoReview){
    //res.status(400).json({msg:'Ya has comentado este producto.'})
    //}
    const review = { 
        name: userName, //req.user.name,
        rating: Number(rating), //va a venir en el body que hemos desestructurado antes 
        comment,
        user: userId
        }
        console.log('La review',review)
    product.reviews.push(review); //anadimos al array de reviews ESTO ES LA CALIFICACION INDIVIDUAL
    product.totalReviews = product.reviews.length;
    //const reducer = (accumulator, currentValue) => accumulator + currentValue; Acumulador (acc), Valor Actual (cur), Índice Actual (idx)
    /*EL RATING ES LA CALIFICACION GLOBAL DEL PRODUCTO , 
    sumamos todas las calificaciones que tenga ese producto y lo divismo entre el total de reviews*/
    product.ratingProduct = product.reviews.reduce(
        (accumulator,item)=>item.rating + accumulator, 0)/product.reviews.length
    await product.save();
    return product
    }
    


module.exports = execute