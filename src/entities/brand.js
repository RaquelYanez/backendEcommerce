const {Schema, model} = require('mongoose');

const BrandSchema = Schema({
    brandName:{ type:String, 
    required:[true, 'El nombre de la marca es obligatorio'],
    unique:true }
}); 

module.exports= model('Brand', BrandSchema)