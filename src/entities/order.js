const {Schema, model} = require('mongoose');


//create mongoose schema
const OrderSchema = Schema({
    user:{ 
        type: Schema.Types.ObjectId,
        required :true,
        ref:'User'
    },
    orderProducts:[
        { 
            _id:false,
            qty: { type: Number },
            productId: {
                type: Schema.Types.ObjectId,
                required :true,
                ref:'Product' },
            sizeId: {
                type: Schema.Types.ObjectId,
                required :true,
                ref:'Size' },
        }
    ],
    shippingAddress: { 

        address: {
            type: String,
            required:true },
        city: {
            type: String,
            required:true },
        cp: {
            type: String,
            required:true },
        country: {
            type: String,
            required:true }
    },
    paymentMethod: { 
        type: String,
        required: true
    },
    shippingPrice: {
        type: Number,
        required:true,
        default:0.0
     },
    totalPrice: {
        type: Number,
        default: false,
        default:0.0
    },
    isPaid: {
        type: Boolean,
        default: false,
        required:true
    },
    paidDate: {
        type: Date,
    },
    isDelivered:{ 
        type: Boolean,
        default: false,
        required:true 
    },
    deliveredDate: {
        type: Date,
    },
    //PARTE DE PRUEBAS
    payStatus :{
        id: {
            type: String,
            },
        status:{
            type: String,
            default: "Esta pagado, pedido en preparacion",
            }, //si es ok que ponga COMPLETADO o algo asi
        emailPaypal:{
            type: String,
            },   
    }
}); 



module.exports= model('Order', OrderSchema);