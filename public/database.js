const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/crud-mongo',{
    useUnifiedTopology :true,
    useNewUrlParser:true
})
    .then(db => console.log('Conectado a la base de Datos'))
    .catch(e => console.log(e))