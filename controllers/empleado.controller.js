const Empleado = require('../models/empleado');

// Consultar todos los empleados
const getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar empleados', error });
    }
};

// Registrar un empleado
const createEmpleados = async (req, res) => {
    try {
        const nuevoEmpleado = new Empleado(req.body);
        await nuevoEmpleado.save();
        res.status(201).json({ mensaje: 'Empleado registrado', empleado: nuevoEmpleado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar empleado', error });
    }
};

// Consultar un empleado por su ID
const getUnicoEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findById(req.params.id);

        if (!empleado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        res.json(empleado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al consultar el empleado', error });
    }
};

// Actualizar un empleado
const editarEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!empleado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        res.json({ mensaje: 'Empleado actualizado', empleado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar empleado', error });
    }
};

// Eliminar un empleado
const eliminarEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findByIdAndDelete(req.params.id);

        if (!empleado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        res.json({ mensaje: 'Empleado eliminado', empleado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar empleado', error });
    }
};

module.exports = {
    getEmpleados,
    createEmpleados,
    getUnicoEmpleado,
    editarEmpleado,
    eliminarEmpleado
};