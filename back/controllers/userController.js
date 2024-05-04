
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const register = asyncHandler(async (req,res) => {

    //desestructurar un  objeto
    const {name, email, password} = req.body

    //verificar que me pasen los datos
    if (!name || !email || !password){
        res.status(400)
        throw new Error ('Faltan datos')
    }

    //verificar que el usuario existe o no
    const userExiste = await User.findOne({email})
    if(userExiste){
        res.status(400)
        throw new Error('Ese usuario ya existe en la base de datos')
    }

    //Hacemos el HASH
    //le ponemos un valor de rondas que es la cantidad de numero aleatorios a generar (1 al 10)
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    //crear el usuario 
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json(user)
})

const login = asyncHandler( async (req,res)=> {

    //desestructurando
    const {email, password} = req.body
    //verificar que el usuario existe
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)

        })
    }else{
        res.status(401)
        throw new Error ("Credenciales Incorrectas")
    }
})

const generarToken = (idusuario) => {
    return jwt.sign({idusuario},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

const showdata = asyncHandler( async (req,res)=> {
    
    res.status(200).json(req.user)
})

module.exports = {
    register,
    login,
    showdata
}