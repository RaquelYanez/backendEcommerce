const {Schema, model} = require('mongoose');

const BrandSchema = Schema({
    brandName:{ type:String, 
    unique:true }
}); 


module.exports= model('Brand', BrandSchema);