// express
const express = require("express");
// para leer las variables de entorno
require("dotenv").config();
// importo cors para aceptar o filtrar conexiones especificas
const cors = require("cors");
// mi conexion con mongoose a mongoDB
const { dbConnection } = require("./db/config");

// Crear el servidor de express
const app = express();

//Conexion a la DB
dbConnection();

// cors
app.use(cors());

// directorio public
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// rutas
app.use("/api/auth", require("./routes/auth"));
// TODO: CRUD: Eventos

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server run in port: ${process.env.PORT}`);
});
