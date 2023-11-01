const mongoose = require('mongoose');

const devolucionSchema = new mongoose.Schema({
    razon: String,
    fecha: Date,
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
    },
    vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendedor',
    },
    ventaRelacionada: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venta',
    },
  });
  
  const Devolucion = mongoose.model('Devolucion', devolucionSchema);
  
  module.exports = Devolucion;
  