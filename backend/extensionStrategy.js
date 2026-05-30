// 1. Definición de las Estrategias de cálculo de fechas
export const ExtensionEstandarStrategy = {
  calcular: (fechaActual) => {
    const copia = new Date(fechaActual);
    copia.setDate(copia.getDate() + 7);
    return copia.toISOString().split("T")[0];
  },
};

export const ExtensionAcademicaStrategy = {
  calcular: (fechaActual) => {
    const copia = new Date(fechaActual);
    copia.setDate(copia.getDate() + 14);
    return copia.toISOString().split("T")[0];
  },
};

// 2. Contexto que utiliza la estrategia seleccionada
export class ExtensionContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  ejecutarEstrategia(fechaActual) {
    return this.strategy.calcular(fechaActual);
  }
}
