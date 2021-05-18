const {Schema, model} = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

//create mongoose schema
const UserSchema = Schema({
    name: { type: String, 
        required: [true, 'Campo name obligatorio'] 
    },
    lastName: { type: String,
        required: [true, 'Campo lastName obligatorio'] 
    },
    email: { type: String, 
        required: [true, 'Campo email obligatorio'],
        lowercase: true,
        unique: true,
    },
    password: { type: String,
        required: [true, 'Campo password obligatorio'], 
    },
    rol: {type: String,
        required: true
    },
    googleEmail: {type: Boolean,
        default: false 
    },
    birthdate: {type: Date,
    },
    city:{type: String,
        required: false 
    },
    postalCode:{type: Number, 
        required: false,
    },
    address:{ type: String,
        required: false
    },
    phone:{type: String,
        required: true,
    }
 
}); 

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...user} = this.toObject();
    user.userId = _id;
    return user;
}

module.exports= model('User', UserSchema);