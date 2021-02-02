const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const jugadorSchema = new Schema ({
    nombre : String,
    points : Number
})

const jugadores = mongoose.model('jugadores', jugadorSchema)

module.exports = jugadores