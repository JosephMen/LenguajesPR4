const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    nombre : String,
    apellido : String
})

const Tasks = mongoose.model('tasks', taskSchema)

module.exports = Tasks