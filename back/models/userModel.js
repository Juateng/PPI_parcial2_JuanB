const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor teclea tu nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor teclea tu email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea tu password']
    },
    esAdmin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

//se debe poner en singular y capital pues mongoose lo pasa a plurar y minuscula
module.exports = mongoose.model('User', userSchema)