"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruction_1 = require("./Instruction");
class Funcion extends Instruction_1.default {
    constructor(p_fila, p_columna, p_id, p_lista_parametros, p_lista_sentencias) {
        super(p_fila, p_columna);
        this.identificador = p_id;
        this.lista_parametros = p_lista_parametros;
        this.lista_sentencias = p_lista_sentencias;
        this.lista_valores = new Array();
    }
    getIdentificador() {
        return this.identificador;
    }
    getLista_parametros() {
        return this.lista_parametros;
    }
    setLista_parametros(lista_parametros) {
        this.lista_parametros = lista_parametros;
    }
    getThis() {
        //To change body of generated methods, choose Tools | Templates.
        return undefined;
    }
    pasarParametros(lista_parametros_enviados, salida) {
        //To change body of generated methods, choose Tools | Templates.
        return undefined;
    }
    ejecutar(entorno_padre, salida) {
        //To change body of generated methods, choose Tools | Templates.
        return undefined;
    }
}
exports.default = Funcion;
//# sourceMappingURL=Funcion.js.map
//# sourceMappingURL=Funcion.js.map