"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Instruction {
    constructor(pfila, pcolumna) {
        this.fila = pfila;
        this.columna = pcolumna;
    }
    ejecutar(entorno_padre, salida) {
        return undefined;
    }
    traducir(entorno_padre, salida) {
        return undefined;
    }
    graficar(entorno_padre, salida) {
        return undefined;
    }
    generar(entorno_padre, salida) {
        return undefined;
    }
    getThis() {
        return undefined;
    }
    get Fila() {
        return this.fila;
    }
    set Fila(p_fila) {
        this.fila = p_fila;
    }
    get Columna() {
        return this.columna;
    }
    set Columna(p_columna) {
        this.columna = p_columna;
    }
}
exports.default = Instruction;
//# sourceMappingURL=Instruction.js.map