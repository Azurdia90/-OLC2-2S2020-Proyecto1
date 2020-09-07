"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruction_1 = require("./Instruction");
const Simbolo_1 = require("./Simbolo");
const Tipo_1 = require("./Tipo");
const Tabla_Simbolos_1 = require("./Tabla_Simbolos");
class Sentencia_Acceso extends Instruction_1.default {
    constructor(p_fila, p_columna, p_id, p_lista_accesos) {
        super(p_fila, p_columna);
        this.identificador = p_id;
        this.lista_accesos = p_lista_accesos;
    }
    ejecutar(entorno_padre, salida) {
        let _return;
        let acceso;
        let lista_valores;
        try {
            if (entorno_padre.has(this.identificador)) {
                acceso = entorno_padre.get(this.identificador);
            }
            else {
                if (Tabla_Simbolos_1.default.getInstance().getStack().existsSimbolo(this.identificador)) {
                    acceso = entorno_padre.get(this.identificador);
                }
                else {
                    _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("La variable: \"" + this.identificador + "\" NO se encuentra en el entorno local.");
                    return _return;
                }
            }
            if (this.lista_accesos.length == 0) {
                _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Operador Acceso: No existen accesos definidos.");
                return _return;
            }
            else {
                lista_valores = new Array();
            }
            for (var cont = 0; cont < this.lista_accesos.length; cont++) {
                if (acceso.getRol() == 0 /* valor */) {
                    _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Operador Acceso: No existen accesos definidos para un valor primitivo.");
                    return _return;
                }
                else if (acceso.getRol() == 1 /* arreglo */) {
                    this.lista_accesos[cont].setPadre(acceso);
                    acceso = this.lista_accesos[cont].ejecutar(entorno_padre, salida);
                }
                else if (acceso.getRol() == 2 /* type */) {
                    this.lista_accesos[cont].setPadre(acceso);
                    acceso = this.lista_accesos[cont].ejecutar(entorno_padre, salida);
                }
                else if (acceso.getRol() == 9 /* error */) {
                    return acceso;
                }
                else {
                    _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Operador Acceso: No existen accesos definidos.");
                    return _return;
                }
            }
            return acceso;
        }
        catch (Exception) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Sentencia Acceso: " + Exception.Message);
            return _return;
        }
    }
    getThis() {
        let lista_clon = new Array();
        for (var x = 0; x < this.lista_accesos.length; x++) {
            lista_clon.push(this.lista_accesos[x].getThis());
        }
        return new Sentencia_Acceso(this.fila, this.columna, this.identificador, lista_clon);
    }
}
exports.default = Sentencia_Acceso;
//# sourceMappingURL=Sentencia_Acceso.js.map