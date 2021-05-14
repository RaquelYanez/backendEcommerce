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
        validate: value =>{
            if(validator.isEmail(value)){
                throw new Error({error:'email incorrecto'})
            }
        }
    },
    password: { type: String,
        required: [true, 'Campo password obligatorio'], 
        //check if a password is strong or not
        validate: value =>{
            if(validator.isMobilePhone(value,{ minLength: 8,
                minLowercase: 1, minUppercase: 1,
                minNumbers: 1, minSymbols: 1})){
            setErrorMessage('La password correcta')
            }else{
            setErrorMessage('La password no es correcta')    
            }
        }
    },
    rol: {type: String,
        required: true
    },
    googleEmail: {type: Boolean,
        default: false 
    },
    birthdate: {type: Date,
//FALTA LA EDAD
        validate: value =>{
            value.setFullYear(value.getFullYear()+18)
            const currentTime = new Date()
            currentTime.setHours(0,0,0,0)
            return value.getTime()<= currentTime.getTime();
        },
        //throw new Error({error:'email incorrecto'})
        message:'Debes de ser mayor de 18'
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
        // check if the string phone is a mobile phone number
        validate: value =>{
            if(validator.isMobilePhone(value)){
                throw new Error({error:'phone incorrecto'})
            }
        }
    },
    tokens:[{
        token:{type: String,
        required:true}
    }]
 
}); 

//funcion para cifrar la password
UserSchema.pre('save', async (next) =>{
   const user = this
   if(user.isModified('password')){
       user.password = await bcryptjs.hash(user.password,8)
   }
   next()
});
//auth token for the user
UserSchema.methods.generateAuthToken = async() =>{
    const user = this
    const token = jwt.sign({_id:user.id}, process.env.SECRET_TOKEN);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
}
//search by email and password
UserSchema.statics.compareCredentials = async (email,password) =>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error({error:'email o password incorrectos'});
    }
    const isCorrectPassword = await bcryptjs.compare(password, user.password)
    if(!isCorrectPassword){
        throw new Error({error:'password incorrecta'});
    }
    return user
}

module.exports= model('User', UserSchema);