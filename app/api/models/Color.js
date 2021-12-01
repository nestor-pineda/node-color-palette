// Importamos el modulo de Mongoogse
const mongoose = require("mongoose");
// Mongoose tiene esquemas de información, así que vamos a utilizarlos
const Schema = mongoose.Schema;
// Creamos el objeto del Schema con sus campos:
const ColorSchema = new Schema(
  {
    name: { type: String, require: true },
    hex: { type: String, require: true },
    rgb: { type: String, require: true },
  },
  { timestamps: true }
);

// Exportamos el modelo para poder usarlo en otros ficheros
const Color = mongoose.model("colors", ColorSchema); // "colors" es el nombre del modelo. Se lo asignamos aqui y ahora. Lo guardamso en la variable Color
module.exports = Color;
