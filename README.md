# Sistema de Gestión de Biblioteca - MVP

## Descripción del Proyecto

Este proyecto es un Producto Mínimo Viable (MVP) diseñado para la gestión integral de una biblioteca académica. Permite la carga, edición y visualización de libros, así como también el control estricto de préstamos, devoluciones y extensiones de plazos.

El ecosistema tecnológico está compuesto por una **API REST en Node.js (Express)** conectada a una base de datos **MySQL**, y una interfaz de usuario moderna desarrollada en **React 19, TypeScript y Vite**.

---

## Arquitectura del Sistema: MVC

El sistema aplica el patrón arquitectónico **Modelo-Vista-Controlador (MVC)** para garantizar una correcta separación de responsabilidades entre la lógica de negocio, la persistencia de datos y la interfaz de usuario.

```text
[ Usuario ]
     |
     v
[ Vista - React ]
     |
     v
[ Controlador - Express ]
     |
     v
[ Modelo - MySQL ]
```

### Modelo (`/backend/*Model.js`)

Contiene la lógica de acceso a datos y es el único componente que interactúa directamente con la base de datos MySQL mediante consultas SQL.

### Controlador (`/backend/*Controller.js`)

Recibe las solicitudes HTTP (`req`), procesa los parámetros recibidos, invoca los métodos correspondientes del modelo y devuelve respuestas estructuradas en formato JSON (`res`).

### Vista (`/src/*`)

Interfaz desarrollada con React y TypeScript. Consume la API mediante solicitudes HTTP y renderiza dinámicamente la información al usuario.

---

## Patrones de Diseño Implementados

Para cumplir con los criterios de calidad profesional y desacoplamiento del sistema, se implementaron los siguientes patrones de diseño.

### Singleton

**Ubicación:** `backend/db.js`

#### Problema que resuelve

Evita la creación innecesaria de múltiples conexiones a la base de datos, optimizando el consumo de recursos y centralizando el acceso al pool de conexiones.

#### Implementación

Se encapsula el pool de conexiones de MySQL en una única instancia reutilizable durante toda la ejecución de la aplicación.

```javascript
class DatabaseConnection {
  static instance = null;

  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }

    this.pool = mysql.createPool({...});
    DatabaseConnection.instance = this;
  }
}
```

---

### Strategy

**Ubicación:** `backend/extensionStrategy.js` y `backend/prestamoController.js`

#### Problema que resuelve

Permite modificar el algoritmo utilizado para calcular extensiones de préstamos sin alterar el controlador principal. De esta forma el sistema queda preparado para incorporar nuevas reglas de negocio respetando el Principio Abierto/Cerrado (Open/Closed Principle).

#### Implementación

Se definieron estrategias independientes para calcular diferentes tipos de extensión:

- `ExtensionEstandarStrategy`: agrega 7 días.
- `ExtensionAcademicaStrategy`: agrega 14 días.

El controlador selecciona dinámicamente la estrategia adecuada según el tipo de extensión recibido.

```javascript
import {
  ExtensionContext,
  ExtensionEstandarStrategy,
  ExtensionAcademicaStrategy,
} from "./extensionStrategy.js";

const tipo = req.body.tipo_extension;

const estrategia =
  tipo === "academica" ? ExtensionAcademicaStrategy : ExtensionEstandarStrategy;

const contextoExtension = new ExtensionContext(estrategia);

const nuevaFecha = contextoExtension.ejecutarEstrategia(new Date());
```

---

## Testing Unitario (Vitest)

La lógica principal del modelo se encuentra cubierta mediante pruebas unitarias utilizando **Vitest**.

### Cobertura de pruebas en `libroModel.test.js`

#### 1. `findAllLibros`

Verifica que la consulta retorne correctamente la colección de libros junto con la información asociada.

#### 2. `findLibroById` (Caso de éxito)

Valida que un libro existente pueda recuperarse correctamente mediante su identificador.

#### 3. `findLibroById` (Caso alternativo)

Comprueba que se devuelva `null` cuando el identificador solicitado no existe.

#### 4. `insertLibro`

Verifica que la inserción de un nuevo libro genere correctamente el registro y retorne el `insertId`.

---

## Configuración de la Base de Datos (XAMPP)

### 1. Iniciar MySQL desde XAMPP

Abrir el Panel de Control de XAMPP y asegurarse de que el servicio **MySQL** se encuentre iniciado.

---

### 2. Crear la Base de Datos

Ingresar a phpMyAdmin o utilizar la consola de MySQL y ejecutar:

```sql
CREATE DATABASE biblioteca_db;
USE biblioteca_db;
```

---

### 3. Crear las Tablas

```sql
USE biblioteca_db;

CREATE TABLE libros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion TEXT,
    categoria VARCHAR(100),
    disponibilidad BOOLEAN
);

CREATE TABLE prestamos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    libro_id INT,
    persona VARCHAR(100),
    fecha_prestamo DATE,
    fecha_devolucion DATE,

    FOREIGN KEY (libro_id)
    REFERENCES libros(id)
);
```

---

### 4. Cargar Datos Iniciales

```sql
INSERT INTO libros
(nombre, descripcion, categoria, disponibilidad)
VALUES
('El Señor de los Anillos', 'Trilogía completa de fantasía épica', 'Fantasía', true),
('Cien años de soledad', 'Obra maestra del realismo mágico', 'Novela', true),
('Breves respuestas a las grandes preguntas', 'Último libro de Stephen Hawking', 'Ciencia', true),
('Clean Code', 'Manual de buenas prácticas en desarrollo de software', 'Tecnología', true);
```

---

### 5. Configurar la Conexión del Backend

Verificar que el archivo `backend/db.js` tenga configuradas correctamente las credenciales de acceso:

```javascript
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "biblioteca_db",
});
```

---

### 6. Verificar la Instalación

Ejecutar:

```sql
SELECT * FROM libros;
SELECT * FROM prestamos;
```

Si ambas consultas funcionan correctamente, la base de datos está lista para utilizarse con la aplicación.

---

## Instrucciones de Ejecución

### Requisitos Previos

- Node.js v18 o superior.
- pnpm instalado globalmente.
- MySQL activo mediante XAMPP.
- Base de datos `biblioteca_db` creada.

---

### 1. Instalar Dependencias

```bash
pnpm install
```

---

### 2. Levantar el Backend

```bash
pnpm run serve:api
```

La API quedará disponible en:

```text
http://localhost:3000
```

---

### 3. Levantar el Frontend

```bash
pnpm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

### 4. Ejecutar las Pruebas

```bash
pnpm run test
```

Esto ejecutará la suite de pruebas unitarias y mostrará los resultados en consola.

---

## Tecnologías Utilizadas

### Backend

- Node.js
- Express
- MySQL
- mysql2

### Frontend

- React 19
- TypeScript
- Vite

### Testing

- Vitest

### Gestión de Dependencias

- pnpm

---

## Estructura General del Proyecto

```text
biblioteca-mvp/
│
├── backend/
│   ├── db.js
│   ├── libroModel.js
│   ├── libroController.js
│   ├── prestamoModel.js
│   ├── prestamoController.js
│   └── extensionStrategy.js
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.tsx
│
├── tests/
│   └── libroModel.test.js
│
├── package.json
├── vite.config.ts
└── README.md
```

---

## Integrantes

- Rivalta Ariela
- Roggero Estefania

---

## 📚 Fuentes y Recursos

### Documentación Oficial

- React
- Vite
- Node.js
- Express
- MySQL
- Vitest

### Material Académico

- Apuntes y documentación de la materia Ingeniería de Software.
- Material de clases sobre Arquitectura MVC.
- Material de clases sobre Patrones de Diseño.
- Material de clases sobre Testing Unitario.

---

## 📄 Licencia

Proyecto desarrollado con fines académicos y educativos.
