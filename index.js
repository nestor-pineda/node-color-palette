// IMPORTACIONES
const express = require("Express"); // Requerimos Express para poder utilizarlo.
const logger = require("morgan"); // Requerimos Morgan para poder utilizarlo
const { connect } = require("./app/config/database.js"); // traigo la función de la DB
// Importamos las ritas de la carpeta routes.
const users = require("./app/api/routes/user.routes");
const colors = require("./app/api/routes/color.routes");
const palettes = require("./app/api/routes/palette.routes");
// Otras importaciones
const HTTPSTATUSCODE = require("./app/utils/httpStatusCode");
const cors = require("cors");

// Conectamos con la DB
connect();
// Arrancamos el servidor a traves de la constante app.
const app = express();

// Configuración de headers o cabeceras de nuestra respuesta, para definir que podemos y que no podemos  hacer con el servidor
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Configuración de Cors, para definir las direcciones que van a tener permiso para utilizar la API.
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"], // Estas son las dos direcciones que podran suar la API.
    credentials: true,
  })
);

// Vamos a configurar Express para poder enviar y recibir información en el body de las peticiones en formato JSON
app.use(express.json()); // con esto está en formato JSON
app.use(express.urlencoded({ extended: true })); // nos permite la codificación de la URL.

// Vamos a decirle a Morgan que nos ayude a ver las peticiones que vamos a ir lanzando desde Postman.
app.use(logger("dev"));

// Defino las rutas que he importado arriba
/* app.use("/users", users);
app.use("/colors", colors);
app.use("/palettes", palettes); */

// Vamos a controlar los errrores si las rutas no coinciden con ninguna que hayamos definido con nuestro servidor

app.use((req, res, next) => {
  let err = new Error();
  err.status = 404;
  err.message = HTTPSTATUSCODE[404];
  next(err);
});

// Función que se va a encargar de recibir este error y devovlerlo en un JSON
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || "Unexpected error");
});

// Ocular que se sepa que nuestra API está montada con Node
app.disable("x-powered-by");

// Le digo que escuche en el puerto 3000.
app.listen(3000, () => {
  console.log("Escuchando servideor node en puerto 3000");
});
