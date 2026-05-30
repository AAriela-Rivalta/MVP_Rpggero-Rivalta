import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  findAllLibros,
  insertLibro,
  editLibro,
  findLibroById,
  deleteLibro,
} from "./libroModel.js";
import { pool } from "./db.js";

// Creamos un simulador (mock) del módulo de la base de datos
//Esta simulacion se crea para probar que el codigo JavaScript funcione
//No se puede hacer un test de una funcion eliminar en una base real porque
//cada vez que corrar un test se borraria un libro
vi.mock("./db.js", () => ({
  pool: {
    query: vi.fn(),
  },
}));

describe("Pruebas Unitarias en libroModel.js", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Limpia los datos simulados entre test y test
  });

  // TEST 1: Caso de éxito - Obtener todos los libros
  it("findAllLibros debería retornar la lista de libros con sus préstamos", async () => {
    const mockRows = [
      {
        id: 1,
        nombre: "El Aleph",
        descripcion: "Cuentos",
        categoria: "Ficción",
        disponibilidad: 1,
        persona: null,
      },
    ];

    // Simulamos que la base de datos responde con nuestras filas
    pool.query.mockResolvedValue([mockRows]);

    const resultado = await findAllLibros();

    expect(resultado).toEqual(mockRows);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  // TEST 2: Caso de éxito - Buscar libro por ID existente
  it("findLibroById debería retornar el libro correspondiente si el ID existe", async () => {
    const mockLibro = { id: 5, nombre: "Rayuela", disponibilidad: 1 };
    pool.query.mockResolvedValue([[mockLibro]]);

    const resultado = await findLibroById(5);

    expect(resultado).toEqual(mockLibro);
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM libros WHERE id = ?",
      [5],
    );
  });

  // TEST 3: Caso alternativo/vacío - Buscar un libro que no existe
  it("findLibroById debería retornar null si el ID no existe en la base de datos", async () => {
    pool.query.mockResolvedValue([[]]); // Simulamos que la consulta vuelve vacía

    const resultado = await findLibroById(999);

    expect(resultado).toBeNull();
  });

  // TEST 4: Caso de éxito - Insertar un nuevo libro
  it("insertLibro debería ejecutar correctamente el INSERT con los datos provistos", async () => {
    const nuevoLibro = {
      nombre: "Ficciones",
      descripcion: "Libro de Jorge Luis Borges",
      categoria: "Literatura",
      disponibilidad: 1,
    };

    pool.query.mockResolvedValue([{ insertId: 10 }]);

    const resultado = await insertLibro(nuevoLibro);

    expect(resultado).toHaveProperty("insertId", 10);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});

// TEST 5: Caso de éxito - Eliminar un libro
it("deleteLibro debería ejecutar el DELETE con el ID correspondiente", async () => {
  pool.query.mockResolvedValue([{ affectedRows: 1 }]);

  const resultado = await deleteLibro(14);

  expect(resultado).toHaveProperty("affectedRows", 1);
  expect(pool.query).toHaveBeenCalledWith(
    "DELETE FROM libros WHERE id = ?",
    [14],
  );
});
