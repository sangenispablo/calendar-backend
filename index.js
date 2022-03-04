const express = require("express");
// para leer las variables de entorno
require("dotenv").config();

// Crear el servidor de express
const app = express();

// directorio public
app.use(express.static("public"));

// rutas
app.use("/api/auth", require("./routes/auth"));
// TODO: CRUD: Eventos

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server run in port: ${process.env.PORT}`);
});
