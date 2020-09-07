"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruction_1 = require("./Instruction");
const Simbolo_1 = require("./Simbolo");
const Tipo_1 = require("./Tipo");
class Tipo_Acceso extends Instruction_1.default {
    constructor(p_fila, p_columna, p_tipo, expresion1, expresion2, expresion3) {
        super(p_fila, p_columna);
        this.tipo = p_tipo;
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
        this.expresion3 = expresion3;
    }
    ejecutar(entorno_padre, salida) {
        let _return;
        try {
            if (this.tipo == 0) {
                return this.expresion1.ejecutar(entorno_padre, salida);
            }
            else if (this.tipo == 1) {
                return this.expresion1.ejecutar(entorno_padre, salida);
            }
            else if (this.tipo == 2) {
                return this.expresion2.ejecutar(entorno_padre, salida);
            }
            else {
                _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Error Valor Acceso: Tipo de Acceso no definido ");
            }
            return _return;
        }
        catch (Exception) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Tipo Acceso: " + Exception.Message);
            return _return;
        }
    }
    getTipo() {
        return this.tipo;
    }
    getThis() {
        return new Tipo_Acceso(this.fila, this.columna, this.tipo, this.expresion1 == undefined ? null : this.expresion1.getThis(), this.expresion2 == undefined ? null : this.expresion2.getThis(), this.expresion3 == undefined ? null : this.expresion3.getThis());
    }
}
exports.default = Tipo_Acceso;
//# sourceMappingURL=Tipo_Acceso.js.map
//# sourceMappingURL=Tipo_Acceso.js.map