const dotenv = require("dotenv"); // Requerimos dotenv para acceder a als variables de entrono de mi .env
dotenv.config(); // Configuro mi dotenv y arrancarlo

const mongoose = require("mongoose"); // Requerimos mongoose para comunicarnos con Mongo

const mongoDB = process.env.MONGO_DB; // Usamos nustra conexion a la BD que está en el erchivvo .env y lo almaceno en mongoDB de manera "secreta".

// Vamos a conectar la BD con el servidor

const connect = async () => {
  // Creamos una función asincrona llamada connect
  try {
    // Nos conectamos a traves de Mongoose con la DB almacenada en .env y defino los métodos de parseo y topología
    const db = await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    const { name, host } = db.connection; // le saco a la conexión con la DB el nombre y el host para poder hacer console.log()
    console.log(`Conectado con la base de datos ${name}, en el host ${host}`);
  } catch (err) {
    console.log("Error conectando con la DB", err);
  }
};

module.exports = { connect }; // exportamos para poder usarla en otros sitios del servidor
