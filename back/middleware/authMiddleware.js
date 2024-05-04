const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel') 

const protect = asyncHandler(async(req,res, next) => {
    
    let token 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //obtenemos el token
            token = req.headers.authorization.split(' ')[1]
            //para firmar y verificar el token se usa el JWT_SECRET que creamos en el .env

            //verificar la forma del token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Obtener los datos del usuario del payload del token 
            //y lo vamos a poner en un objeto
            req.user = await User.findById(decoded.idusuario).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error ('Acceso no autorizado')
        }         
    }
    if(!token){
        res.status(401)
        throw new Error ('Acceso no autorizado, no proporcionate el token')
    }
})

module.exports = {
    protect
}