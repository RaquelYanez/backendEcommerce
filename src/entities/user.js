const {Schema, model} = require('mongoose');


//create mongoose schema
const UserSchema = Schema({
    name: { 
        type: String, 
        required: [true, 'Campo name obligatorio'] 
    },
    lastName: { 
        type: String,
        required: [true, 'Campo lastName obligatorio'] 
    },
    email: { 
        type: String, 
        required: [true, 'Campo email obligatorio'],
        lowercase: true,
        unique: true,
    },
    googleEmail: { 
        type: Boolean, 
        default: false,
    },
    password: { 
        type: String,
        required: [true, 'Campo password obligatorio'], 
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun:['ADMIN_ROLE', 'USER_ROLE']
    }
  
 
}); 

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...user} = this.toObject();
    user.userId = _id;
    return user;
}

module.exports= model('User', UserSchema);