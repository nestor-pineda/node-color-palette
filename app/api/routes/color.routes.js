//Importamos express
const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
//Guardamos la funcion express.Router() en una variable
const router = express.Router();

//Importamos las funciones del controlador de color
const { getAllColors, getColorById, createColor, deleteColor } = require("../controllers/colo.controller");
//Definimos el metodo, la ruta de entrada y la función del controlador
//que se encargará de efectuar la lógica

// Sin estar autorizado nos muestra el resultado.
// router.get("/", getAllColors);
// router.get("/:colorId", getColorById);}

// Forzar estar autorizado para ver el resultado.
router.get("/", [isAuth], getAllColors);
router.get("/:colorId", [isAuth], getColorById);
router.post("/create", createColor);
router.delete("/:colorId", deleteColor);
//exportamos la variable router
module.exports = router;
