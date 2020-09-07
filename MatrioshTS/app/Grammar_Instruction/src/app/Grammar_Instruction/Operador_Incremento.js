"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expresion_1 = require("./Expresion");
const Simbolo_1 = require("./Simbolo");
const Tipo_1 = require("./Tipo");
class Operador_Incremento extends Expresion_1.default {
    constructor(p_fila, p_columna, p_operador_izq) {
        super(p_fila, p_columna, 1 /* SUMA */, p_operador_izq);
    }
    ejecutar(entorno_padre, salida) {
        let _return;
        try {
            let op1 = (this.operador_izq == null) ? null : this.operador_izq.ejecutar(entorno_padre, salida);
            if (op1 == null) {
                _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Operador vacio");
                return _return;
            }
            if (op1.getRol() != 0 /* valor */ || op1.getRol() != 1 /* arreglo */) {
                return op1;
            }
            if (!(op1.getTipo().getTipo() == 3 /* NUMERO */)) {
                _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("No es posible realizar Operador Incremento con valores no numericos.");
                return _return;
            }
            else {
                let valor = new Number(op1.getValor().toString());
                if (valor == undefined) {
                    valor = 0;
                }
                else {
                    valor = valor.valueOf() + 1;
                }
                op1.setValor(valor);
                _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(3 /* NUMERO */), "");
                _return.setValor(op1.getValor());
                return _return;
            }
        }
        catch (Exception) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Operador Incremento: " + Exception.Message);
            return _return;
        }
    }
    getThis() {
        return new Operador_Incremento(this.fila, this.columna, this.operador_izq.getThis());
    }
}
exports.default = Operador_Incremento;
//# sourceMappingURL=Operador_Incremento.js.map