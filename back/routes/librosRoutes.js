const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const{getLibros, crearLibros,updateLibros, deleteLibros} = require('../controllers/librosController')

router.route('/').get(protect, getLibros).post(protect,crearLibros)
//usar la linea de arriba (6) equivale a las dos lineas de abajo (8 y 9)
//router.get('/', getTareas)
//router.post('/', crearTareas)

router.route('/:id').delete(protect,deleteLibros).put(protect,updateLibros)
//usar la linea de arriba (11) equivale a las dos lineas de abajo (13 y 14)
//router.put('/:id', updateTareas)
//router.delete('/:id', deleteTareas)

module.exports = router