// Cargamos el módulo de mongoose
const mongoose = require("mongoose");
// Cargamos el módulo de bcrypt
const bcrypt = require("bcrypt");
// Cuantas vueltas va a bajarar la contraseña antes de encriptarla
const saltRounds = 10;
// Definimos los esquemas
const Schema = mongoose.Schema;
// Creamos el objeto del esquema con sus correspondientes campos
const UserSchema = new Schema({
  name: { type: String, trim: true, required: true }, // Trim emlimina los espacios
  emoji: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  favPalettes: [{ type: Schema.Types.ObjectId, ref: "palettes" }],
});
// Antes de almacenar la contraseña en la base de datos la encriptamos con Bcrypt
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
// Exportamos el modelo para usarlo en otros ficheros
const User = mongoose.model("users", UserSchema);
module.exports = User;
