const {Schema, model} = require('mongoose');

const BrandSchema = Schema({
    brandName:{ type:String, 
    unique:true }
}); 

BrandSchema.methods.toJSON = function() {
    const { __v, _id, ...brand} = this.toObject();
    brand.brandId = _id;
    return brand;
}

module.exports= model('Brand', BrandSchema);