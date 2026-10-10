const express = require('express');
const router = express.Router();

const {
    getEmpleados,
    createEmpleados,
    getUnicoEmpleado,
    editarEmpleado,
    eliminarEmpleado
} = require('../controllers/empleado.controller');

// Consultar todos los empleados
router.get('/', getEmpleados);

// Registrar un empleado
router.post('/', createEmpleados);

// Consultar un empleado por ID
router.get('/:id', getUnicoEmpleado);

// Actualizar un empleado
router.put('/:id', editarEmpleado);

// Eliminar un empleado
router.delete('/:id', eliminarEmpleado);

module.exports = router;