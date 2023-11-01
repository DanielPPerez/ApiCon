const express = require('express');
const router = express.Router();
const Devolucion = require('../modelos/devolucionM');
const Venta = require('../modelos/ventasM');

// Controlador para crear una devolución
router.post('/crear', async (req, res) => {
  try {
    const nuevaDevolucion = new Devolucion(req.body);
    const devolucionGuardada = await nuevaDevolucion.save();
    res.json(devolucionGuardada);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la devolución.' });
  }
});

// Controlador para obtener todas las devoluciones
router.get('/obtener', async (req, res) => {
  try {
    const devoluciones = await Devolucion.find();
    res.json(devoluciones);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las devoluciones.' });
  }
});

// Controlador para obtener una devolución por ID con detalles adicionales
router.get('/obtener/:devolucionId', async (req, res) => {
  const devolucionId = req.params.devolucionId;
  try {
    const devolucion = await Devolucion.findById(devolucionId);
    if (!devolucion) {
      return res.status(404).json({ error: 'Devolución no encontrada.' });
    }

    // Si necesitas obtener información relacionada, puedes hacerlo aquí
    // Por ejemplo, si deseas obtener información sobre la venta relacionada:
    const ventaRelacionada = await Venta.findById(devolucion.ventaRelacionada)
      .populate('vehiculoVendido')
      .populate('cliente')
      .populate('vendedor');

    // Agrega la información relacionada a la devolución
    devolucion.ventaRelacionada = ventaRelacionada;

    res.json(devolucion);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener la devolución.' });
  }
});

// Controlador para actualizar una devolución por ID
router.put('/actualizar/:devolucionId', async (req, res) => {
  const devolucionId = req.params.devolucionId;
  try {
    const devolucionActualizada = await Devolucion.findByIdAndUpdate(devolucionId, req.body, { new: true });
    if (!devolucionActualizada) {
      return res.status(404).json({ error: 'Devolución no encontrada.' });
    }
    res.json(devolucionActualizada);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la devolución.' });
  }
});

// Controlador para borrar una devolución por ID
router.delete('/borrar/:devolucionId', async (req, res) => {
  const devolucionId = req.params.devolucionId;
  try {
    const devolucionBorrada = await Devolucion.findByIdAndRemove(devolucionId);
    if (!devolucionBorrada) {
      return res.status(404).json({ error: 'Devolución no encontrada.' });
    }
    res.json(devolucionBorrada);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo borrar la devolución.' });
  }
});

module.exports = router;
