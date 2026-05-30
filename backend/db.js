import mysql from "mysql2/promise";

// Clase que implementa el patrón Singleton
class DatabaseConnection {
  static instance = null;

  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }

    // Configuración única del pool
    this.pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "biblioteca_db",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    DatabaseConnection.instance = this;
  }

  getPool() {
    return this.pool;
  }
}

// Exportamos una única instancia controlada (Singleton)
const dbInstance = new DatabaseConnection();
export const pool = dbInstance.getPool();
