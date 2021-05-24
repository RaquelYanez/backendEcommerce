const {Schema, model} = require('mongoose');

const SizeSchema = Schema({
    sizeName:{ 
        type:String, 
        unique:true 
    }
}); 

SizeSchema.methods.toJSON = function() {
    const { __v, _id, ...size } = this.toObject();
    size.sizeId = _id;
    return size;
}

module.exports= model('Size', SizeSchema);