const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  modelo: {
    type: String,
    required: true,
  },
  año: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  nuevo: {
    type: Boolean,
    required: true,
  },
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

module.exports = Vehiculo;
