const Product  = require('../entities/product');

//OBTENEMOS TODOS LOS PRODUCTOS FALTA PAGINAR GUAY en front

//@desc coge todos los productos
//@route GET /api/product
//@acces public
const getProducts =  async (req,res)=>{
    const {limit = 6, offset = 0} = req.query;
    try {
        //Como tenemos dos promesas dependientes, lo que hacemos es un promise.all ganamos tiempo modo "hilos de js" ya se q no existen 
        const [totalProducts, products] = await Promise.all([ //desestructuro el array en 2
            Product.countDocuments(),
            Product.find({}).populate('user', 'name').select('-user')
            .populate('category')
            .populate('brand')
            .populate('sizeProduct.size')
            .skip(Number(offset))
            .limit(Number(limit))
        ]);
        res.json({totalProducts, products})   //cambio el tiempo de respuesta de 580 a 380ms
        
    } catch (error) {
        res.status(500).json({msg:' Error en la busqueda'})  
    }
}


/**ME FALTA EL DE BORRAR UN PRODUCTO 
 * POR EL ADMINISTRADORRRRRR 
 * DARLO DE BAJA 
 * 
//@desc Delete product
//@route DELETE /api/product/:id
//@acces private Admin */



//@desc Create product
//@route POST /api/product
//@acces private Admin
const createOneProduct = async (req,res)=>{
    const product = new Product({
        user: req.body.user, 
        name: req.body.name,
        image: req.body.image,
        color: req.body.color,
        price: req.body.price || 0,
        brand: req.body.brand, 
        sizeProduct:req.body.sizeProduct,
        descriptionShort: req.body.descriptionShort,
        category: req.body.category,
        totalReviews: 0
    })
    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
    
};


//@desc Update product
//@route PUT /api/product/:id
//@acces private Admin
const updateProduct = async (req,res)=>{
    const {id} = req.params
    const {name,image,color,price,brand,sizeProduct,
        descriptionShort,category} = req.body;

    const product = await Product.findById(id);
    if(product){
        product.name = name,
        product.image = image,
        product.color = color,
        product.price = price,
        product.brand = brand,
        product.sizeProduct = sizeProduct
        product.descriptionShort = descriptionShort,
        product.category = category
        
        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct)
    }
    res.status(204).json({msg:`No se encuentra el producto ${id}`})
    
};

//@desc Hacer un comentario del producto asociado por el id
//@route POST /api/product/:id/review
//@acces private 
const createReviewToOneProduct = async (req,res)=>{
    const {id} = req.params
    const userId = req.user._id
    const {rating, comment} = req.body;
    try {
    const product = await Product.findById(id);
    if(product){ //POR AHORA SOLO COMENTAMOS 

       //const alredyDoReview = product.reviews.find(review => review.user.toString() === userId.toString());

        //if(alredyDoReview){
          //  res.status(400).json({msg:'Ya has comentado este producto.'})
        //}

        const review = { 
            name: req.user.name,
            rating: Number(rating), //va a venir en el body que hemos desestructurado antes 
            comment,
            user: userId
        }
        product.reviews.push(review); //anadimos al array de reviews ESTO ES LA CALIFICACION INDIVIDUAL
        product.totalReviews = product.reviews.length;
        //const reducer = (accumulator, currentValue) => accumulator + currentValue; Acumulador (acc), Valor Actual (cur), Índice Actual (idx)
        product.ratingProduct = product.reviews.reduce(
            /*EL RATING ES LA CALIFICACION GLOBAL DEL PRODUCTO , 
            sumamos todas las calificaciones que tenga ese producto y lo divismo entre el total de reviews*/
            (accumulator,item)=>item.rating + accumulator, 0) / 
            product.reviews.length
           
        await product.save();
        res.status(201).json({msg:` Hola, ${req.user.name} se ha enviado tu valoracion del producto`})
        }
    
    res.status(204).json({msg:`No se encuentra el producto ${id}`})
    } catch (error) {
        res.status(500).json({msg:'La valoracion de este producto ha fallado.'})
    }
    
};




module.exports = {
    getProducts,
    createOneProduct,
    updateProduct,
    createReviewToOneProduct,
  
}