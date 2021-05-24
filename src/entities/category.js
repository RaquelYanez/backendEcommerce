const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
    categoryName:{ 
        type:String, 
        unique:true 
    }
}); 

CategorySchema.methods.toJSON = function() {
    const { __v, _id, ...category } = this.toObject();
    category.categoryId = _id;
    return category;
}

module.exports= model('Category', CategorySchema);