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
    user:{ 
        type: Schema.Types.ObjectId,
        required :true,
        ref:'User'
        },

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
    color:{
        type: String, 
        required: true,
    },
    brand: { //puma
        type: Schema.Types.ObjectId,
        required :true,
        ref:'Brand'
    },
    sizeProduct:[
        {
            size:{
                type: Schema.Types.ObjectId,
                required :true,
                ref:'Size'     
                },
            stock:{
                type: Number, 
                required: false,
                default:0
                }
        }
    ],
    descriptionShort:{ 
        type: String, 
        required: true,
    },
    descriptionLong:{ 
        type: String
    },
    category:{  //kids
        type: Schema.Types.ObjectId,
        required :true,
        ref:'Category'
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
    /*sale:{
        type: Number, 
        required: false,
        default:null
    }*/
}); 



module.exports= model('Product', ProductSchema);