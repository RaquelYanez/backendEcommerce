const {Schema, model} = require('mongoose');

const RolesSchema = Schema({
    rol:{type:String}
}); 

module.exports= model('Role', RolesSchema);