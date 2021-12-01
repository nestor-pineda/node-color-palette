// Importamos el modulo de Mongoogse
const mongoose = require("mongoose");
// Mongoose tiene esquemas de información, así que vamos a utilizarlos
const Schema = mongoose.Schema;
// Creamos el objeto del Schema con sus campos:
const PaletteSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    //relacionamos la propiedad colors con la colección colors
    colors: [{ type: Schema.Types.ObjectId, ref: "colors", required: true }],
    //relacionamos la propiedad author con la colección users
    author: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

const Palette = mongoose.model("palettes", PaletteSchema);
module.exports = Palette;
