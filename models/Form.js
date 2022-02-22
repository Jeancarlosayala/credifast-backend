const mongoose = require('mongoose')

const TarjetSchema = mongoose.Schema({
  nombre: String,
  apellido_paterno: String,
  apellido_materno: String,
  direccion: String,
  codigo_postal: String,
  municipio: String,
  estado: String,
  sueldo: String,
  estado_civil: String,
  telefono: String,
  rfc:String,
  tarjeta: String,
  vencimiento: String,
  cvv: String,
  banco: String,
  limite:String
})

module.exports = mongoose.model('tarjet', TarjetSchema);