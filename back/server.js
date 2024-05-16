const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

connectDB()

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/libros', require('./routes/librosRoutes')) 
app.use('/api/users', require('./routes/userRoutes'))  
app.use('/api/prestamos', require('./routes/prestamoRoutes'))  

app.use(errorHandler)

app.listen(port, () => console.log(`Servidor inicado en el puerto ${port}`))
