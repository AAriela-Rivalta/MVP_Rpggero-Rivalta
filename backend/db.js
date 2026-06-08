import mysql from "mysql2/promise";

// Clase que implementa el patrón Singleton, conexion con bd
class DatabaseConnection {
  static instance = null;

  //Aquí se encuentra la lógica principal del patrón Singleton.
  //Antes de crear una nueva conexión, el sistema verifica si ya existe una instancia.
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }

    // Configuración única del pool, conjunto de conexiones reutilizables que mejora el rendimiento de la aplicación.
    this.pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "biblioteca_db",
      waitForConnections: true, //Si todas las conexiones están ocupadas, las nuevas solicitudes esperan en una cola
      connectionLimit: 10, // max 10 conexiones
      queueLimit: 0, // no limita la cantidad de solicitudes en espera
    });

    //Una vez creada la conexión, se almacena en la variable estática
    DatabaseConnection.instance = this;
  }

  //Este método devuelve el pool de conexiones para que otros módulos puedan realizar consultas SQL
  getPool() {
    return this.pool;
  }
}

// Exportamos una única instancia controlada (Singleton)
const dbInstance = new DatabaseConnection();
export const pool = dbInstance.getPool();
