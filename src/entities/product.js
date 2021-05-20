const {Schema, model} = require('mongoose');

const reviewSchema = Schema ({
    name:{ 
        type:String,
        required:true},
    rating:{ 
        type: Number, 
        required: false,
        default:0
        },
    comment:{ 
        type:String,
        required:true},

})

//create mongoose schema
const ProductSchema = Schema({
    //Relacion entre el producto y el usuario administrador que lo ha creado
    user:{ 
        type: Schema.Types.ObjectId,
        required :true,
        ref:'User'
    },
    name: { type: String, 
        required: [true, 'Campo name obligatorio'] 
    },
    image: {
        type: String, 
        required: true,
    },
    brand: { 
        type: Schema.Types.ObjectId,
        required :true,
        ref:'Brand'
    },
    size:{ //ANADE TALLA S M L 
        type: String, 
        required: true,
    },
    descriptionShort:{ 
        type: String, 
        required: true,
    },
    descriptionLong:{ 
        type: String
    },
    category:{ //WOMAN MAN KID
        type: String,
        required: true
    }, 
    //para las reviews
    ratingProduct:{ 
        type: Number, 
        required: false,
        default:0
    },
    //cuando usamos el shema en un unico lugar, en vez de referenciarlo lo cremos en el mismo siito
    reviews:[ reviewSchema ],
    totalReviews:{ 
        type: Number, 
        required: false,
        default:0
    },
    price:{
        type: Number, 
        required: false,
        default:0
    },
    stock:{
        type: Number, 
        required: false,
        default:0
    }
 
}); 



module.exports= model('Product', ProductSchema);