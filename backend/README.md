## 🧩 Patrones de Diseño Implementados (Backend)

Para cumplir con los criterios de calidad profesional y desacoplamiento solicitados, el backend incorpora de forma explícita dos patrones de diseño estructurales y de comportamiento.

---

### 1. Patrón: Singleton

**Ubicación en el código:** `backend/db.js`
**Problema que resuelve:** En aplicaciones que interactúan con motores SQL, crear múltiples instancias de conexión satura los recursos del servidor y genera bloqueos
**Implementación en nuestro MVP:** Se encapsuló el pool de conexiones de `mysql2` dentro de la clase `DatabaseConnection`. Utilizando una propiedad estática privada (`instance`), el sistema intercepta cualquier intento de nueva instanciación. Si la conexión ya existe, reutiliza la misma; si no, la crea por única vez[cite: 285]. Esto garantiza un único punto de acceso global y controlado a la base de datos.

```javascript
// Prueba conceptual de nuestro Singleton en db.js
class DatabaseConnection {
  static instance = null;

  constructor() {
    if (DatabaseConnection.instance) return DatabaseConnection.instance;

    this.pool = mysql.createPool({...});
    DatabaseConnection.instance = this;
  }
}
```

### 2. Patrón: Strategy

(Estrategia de Extensión de Plazos)

**Ubicación en el código:** `backend/extensionStrategy.js` y `backend/prestamoController.js`

- **Problema que resuelve:** Si las reglas de negocio para calcular las fechas de vencimiento de los préstamos cambian de manera imprevista (por ejemplo, definir plazos dinámicos según el tipo de usuario, feriados o promociones), programar estructuras condicionales `if/else` o `switch` interminables dentro de los controladores contamina la lógica de control. Esto viola directamente el **Principio de Abierto/Cerrado (Open/Closed Principle - OCP)** de SOLID, el cual estipula que el código debe estar abierto para su extensión pero cerrado para su modificación.
- **Implementación en nuestro MVP:** Para solucionar este acoplamiento, se encapsuló el cálculo de fechas abstrayéndolo de la persistencia de datos. Diseñamos una interfaz algorítmica común y derivamos dos estrategias independientes:
  1. `ExtensionEstandarStrategy`: Suma automáticamente 7 días corridos a la fecha de préstamo base.
  2. `ExtensionAcademicaStrategy`: Otorga un plazo extendido de 14 días pensando en necesidades de investigación o usuarios premium.

A través de la clase `ExtensionContext` (el Contexto), el controlador de Express es capaz de interceptar el parámetro `tipo_extension` provisto dinámicamente por la interfaz de usuario en React y mutar la estrategia de ejecución en caliente.

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
