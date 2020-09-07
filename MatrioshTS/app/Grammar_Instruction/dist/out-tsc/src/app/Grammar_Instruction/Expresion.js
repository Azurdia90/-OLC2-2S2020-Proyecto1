"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruction_1 = require("./Instruction");
class Expresion extends Instruction_1.default {
    constructor(fila, columna, p_tipo_operacion, p_operador_izq, p_operador_der, p_tipo, p_valor) {
        super(fila, columna);
        this.operador_izq = p_operador_izq;
        this.operador_der = p_operador_der;
        this.operador = p_tipo_operacion;
        this.tipo = p_tipo;
        this.valor = p_valor;
    }
    ejecutar(entorno_padre, salida) {
        return undefined;
    }
    traducir(entorno_padre, salida) {
        return undefined;
    }
}
exports.default = Expresion;
//# sourceMappingURL=Expresion.js.map
//# sourceMappingURL=Expresion.js.map