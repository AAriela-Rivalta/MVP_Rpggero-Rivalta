import express from "express";

import {
  getLibros,
  createLibro,
  updateLibro,
  getLibroById,
  removeLibro,
} from "./backend/libroController.js";

import {
  createPrestamo,
  returnLibro,
  extenderPrestamo,
} from "./backend/prestamoController.js";
//se crea la app expres
const app = express();
//se configura el puerto del servidor
const PORT = process.env.PORT || 3000;
//permite que el servidor interprete automáticamente datos enviados en formato JSON
app.use(express.json());
// comunicacion entre front y back
app.use((req, res, next) => {
  //autoriza las peticiones
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  //Indica qué encabezados puede enviar el cliente.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  //metodos permitidos
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  next();
});

app.get("/api/libros", getLibros);

app.get("/api/libros/:id", getLibroById);

app.post("/api/libros", createLibro);

app.put("/api/libros/:id", updateLibro);

app.post("/api/prestamos", createPrestamo);

app.put("/api/devolver/:id", returnLibro);

app.put("/api/prestamos/extender", extenderPrestamo);

app.delete("/api/libros/:id", removeLibro);

//Inicia el servidor y lo deja escuchando peticiones en el puerto configurado.
app.listen(PORT, () => {
  console.log(`Backend API escuchando en http://localhost:${PORT}`);

  console.log(`Ruta de prueba: http://localhost:${PORT}/api/libros`);
});
