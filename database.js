const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/empleados';

mongoose.connect(URI)
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.error('Error al conectar con MongoDB:', error));

module.exports = mongoose;