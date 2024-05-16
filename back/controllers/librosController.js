const asyncHandler = require('express-async-handler')
const Libro = require('../models/libroModels')

const getLibros = asyncHandler(async (req,res) => {
    const libros = await Libro.find({user: req.user.id})
    res.status(200).json(libros)
})

const getbyISBN = asyncHandler(async (req,res) => {
    const libros = await Libro.findOne({isbn: req.params.isbn})
    res.status(200).json(libros)
})

const crearLibros = asyncHandler(async (req,res) => {
    if(!req.body.descripcion){
        res.status(400)
        throw new Error('Por favor ingresa los datos correspondientes correctamente ')
    }

    const libro = await Libro.create({
        user: req.user.id,
        descripcion : req.body.descripcion,
        titulo: req.body.titulo,
        autor: req.body.autor,
        isbn: req.body.isbn,
        genero: req.body.genero
    })
    res.status(201).json(libro)
})

const updateLibros =  asyncHandler(async (req,res) => {
    //buscamos la tarea que deseamos modificar
    const libro = await Libro.findOne({isbn:req.params.isbn})
    if(!Libro){
        res.status(400)
        throw new Error('El libro no existe')
    }
    const libroUpdated = await Libro.findOneAndUpdate({isbn: req.params.isbn}, req.body, {new:true})
    res.status(200).json(libroUpdated)
})

const deleteLibros = asyncHandler(async (req,res) => {
    //buscamos la tarea que deseamos modificar
    const libro = await Libro.findOne({isbn:req.params.isbn})
    if(!Libro){
        res.status(400)
        throw new Error('El libro no existe')
    }
    await Libro.deleteOne(libro)
    res.status(200).json({isbn:req.params.isbn})
})


module.exports = {
    getLibros,
    crearLibros,
    updateLibros,
    deleteLibros,
    getbyISBN
}