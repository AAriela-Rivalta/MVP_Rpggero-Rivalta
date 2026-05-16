import express from "express";
import { getLibros } from "./backend/libroController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/api/libros", getLibros);

app.listen(PORT, () => {
  console.log(`Backend API escuchando en http://localhost:${PORT}`);
  console.log(`Ruta de prueba: http://localhost:${PORT}/api/libros`);
});
