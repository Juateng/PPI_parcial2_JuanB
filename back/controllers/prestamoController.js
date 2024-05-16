const asyncHandler = require('express-async-handler')
const Prestamo = require('../models/prestamoModel')

const getPrestamos = asyncHandler(async (req,res) => {
    const prestamos = await Prestamo.find()
    res.status(200).json(prestamos)
})

const getPrestbyId = asyncHandler(async (req,res) => {
    const prestamo = await Prestamo.findById(req.params.id)
    res.status(200).json(prestamo)
})

const crearPrestamo = asyncHandler(async (req,res) => {
    if(!req.body.nombre || !req.body.isbn || !req.body.entrega || !req.body.devolucion){
        res.status(400)
        throw new Error('Por favor ingresa los datos correspondientes correctamente ')
    }

    const prestamo = await Prestamo.create({
        nombre: req.body.nombre,
        isbn: req.body.isbn,
        entrega: req.body.entrega,
        devolucion: req.body.devolucion,

    })
    res.status(201).json(prestamo)
})

const updatePrestamo =  asyncHandler(async (req,res) => {
    //buscamos la tarea que deseamos modificar
    const prestamo = await Prestamo.findById(req.params.id)
    if(!Prestamo){
        res.status(400)
        throw new Error('El prestamo no existe')
    }
    const prestamoUpdated = await Prestamo.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(prestamoUpdated)
})

const deletePrestamo = asyncHandler(async (req,res) => {
    //buscamos la tarea que deseamos modificar
    const prestamo = await Prestamo.findById(req.params.id)
    if(!Prestamo){
        res.status(400)
        throw new Error('El libro no existe')
    }
    await Prestamo.deleteOne(prestamo)
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getPrestamos,
    getPrestbyId,
    updatePrestamo,
    deletePrestamo,
    crearPrestamo
}