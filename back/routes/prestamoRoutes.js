const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const{getPrestamos,getPrestbyId,crearPrestamo,deletePrestamo,updatePrestamo} = require('../controllers/prestamoController')

router.route('/').get(getPrestamos).post(crearPrestamo)

router.route('/:id').delete(deletePrestamo).put(updatePrestamo).get(getPrestbyId)

module.exports = router