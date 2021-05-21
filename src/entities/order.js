const {Schema, model} = require('mongoose');


//create mongoose schema
const OrderSchema = Schema({
    user:{ 
        type: Schema.Types.ObjectId,
        required :true,
        ref:'User'
    },
    orderItems:[
        {
            name: {
                type: String,
                required:true },
            quantity: {
                type: Number,
                required:true },
            image: {
                type: String,
                required:true },
            price: {
                type: Number,
                required:true },
            product: {
                type: Schema.Types.ObjectId,
                required :true,
                ref:'Product' },
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
 
}); 



module.exports= model('Order', OrderSchema);