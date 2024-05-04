const mongoose = require('mongoose')

const libroschema = mongoose.Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    titulo: {
        type: String, 
        required: [true, "Por favor ingresa el titulo de un libro"]
    },
    autor: {
        type: String, 
        required: [true, "Por favor ingreso el autor del libro"]
    },
    descripcion: {
        type: String, 
        required: [true, "Por favor ingresa la descripcion del libro"]
    },
    isbn: {
        type: String, 
        required: [true, "Por favor ingresa el Isbn del libro"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Libro', libroschema)