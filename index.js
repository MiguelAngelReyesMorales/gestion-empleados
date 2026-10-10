const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('./database');

const empleadoRoutes = require('./routes/empleado.routes');

const app = express();

// Configuración del servidor
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        status: 'API REST funcionando'
    });
});

app.use('/api/empleados', empleadoRoutes);

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor funcionando en el puerto', app.get('port'));
});