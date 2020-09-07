"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tipo {
    constructor(p_tipo, p_identificador) {
        this.tipo = p_tipo;
        this.traducir(p_tipo);
        this.identificador = p_identificador;
    }
    traducir(p_tipo) {
        if (p_tipo == 0 /* VOID */) {
            this.traduccion = "void";
            this.prioridad = -1;
        }
        else if (p_tipo == 1 /* NULO */) {
            this.traduccion = "null";
            this.prioridad = 3;
        }
        else if (p_tipo == 2 /* BOOLEANO */) {
            this.traduccion = "boolean";
            this.prioridad = 0;
        }
        else if (p_tipo == 3 /* NUMERO */) {
            this.traduccion = "number";
            this.prioridad = 1;
        }
        else if (p_tipo == 4 /* CADENA */) {
            this.traduccion = "string";
            this.prioridad = 2;
        }
        else {
            this.traduccion = this.identificador;
            this.prioridad = 3;
        }
    }
    getTipo() {
        return this.tipo;
    }
    getTraduccion() {
        return this.traduccion;
    }
    getPrioridad() {
        return this.prioridad;
    }
    getIdentificador() {
        return this.identificador;
    }
}
exports.default = Tipo;
//# sourceMappingURL=Tipo.js.map