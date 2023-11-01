const express = require('express');
const router = express.Router();
const Vehiculo = require('../modelos/vehiculosM');

// Controlador para crear un vehículo
router.post('/crear', async (req, res) => {
  try {
    const nuevoVehiculo = new Vehiculo(req.body);
    const vehiculoGuardado = await nuevoVehiculo.save();
    res.json(vehiculoGuardado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el vehículo.' });
  }
});

// Controlador para obtener todos los vehículos
router.get('/obtener', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los vehículos.' });
  }
});

// Controlador para obtener un vehículo por ID
router.get('/obtener/:vehiculoId', async (req, res) => {
  const vehiculoId = req.params.vehiculoId;
  try {
    const vehiculo = await Vehiculo.findById(vehiculoId);
    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado.' });
    }
    res.json(vehiculo);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el vehículo.' });
  }
});

// Controlador para actualizar un vehículo por ID
router.put('/actualizar/:vehiculoId', async (req, res) => {
  const vehiculoId = req.params.vehiculoId;
  try {
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(vehiculoId, req.body, { new: true });
    if (!vehiculoActualizado) {
      return res.status(404).json({ error: 'Vehículo no encontrado.' });
    }
    res.json(vehiculoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el vehículo.' });
  }
});

// Controlador para borrar un vehículo por ID
router.delete('/borrar/:vehiculoId', async (req, res) => {
  const vehiculoId = req.params.vehiculoId;
  try {
    const vehiculoBorrado = await Vehiculo.findByIdAndRemove(vehiculoId);
    if (!vehiculoBorrado) {
      return res.status(404).json({ error: 'Vehículo no encontrado.' });
    }
    res.json(vehiculoBorrado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo borrar el vehículo.' });
  }
});

module.exports = router;
