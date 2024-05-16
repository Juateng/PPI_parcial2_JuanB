const mongoose = require("mongoose")
const libroModels = require("./libroModels")

const prestamoSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: [true, 'Por favor teclea su nombre']
    },
    isbn: {
        type: String,
        required: [true, 'Por favor ingresa el libro a prestar']
    },
    entrega: {
        type: String,
        required: [true, 'Por favor ingrese la fecha de prestamo'],
    },
    devolucion: {
        type: String,
        required: [true, 'Por favor ingrese la fecha de devolucion'],
    }
})

module.exports = mongoose.model('Prestamo',prestamoSchema)