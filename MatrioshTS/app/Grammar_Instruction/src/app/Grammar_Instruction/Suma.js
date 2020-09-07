"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expresion_1 = require("./Expresion");
const Simbolo_1 = require("./Simbolo");
const Tipo_1 = require("./Tipo");
class Suma extends Expresion_1.default {
    constructor(p_fila, p_columna, p_operador_izq, p_operador_der) {
        super(p_fila, p_columna, 1 /* SUMA */, p_operador_izq, p_operador_der);
        this.matriz_operacion_suma = [
            [57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */],
            /*nulo*/ [57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */],
            /*booleano*/ [57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */],
            /*numero*/ [57 /* error */, 57 /* error */, 57 /* error */, 0 /* suma_numero */, 20 /* concatenacion */, 57 /* error */, 57 /* error */],
            /*String*/ [57 /* error */, 57 /* error */, 20 /* concatenacion */, 20 /* concatenacion */, 57 /* error */, 57 /* error */, 57 /* error */],
            /*identificador*/ [57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */],
            /*error*/ [57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */],
        ];
    }
    ejecutar(entorno_padre, salida) {
        let _return;
        try {
            let op1 = (this.operador_izq == null) ? null : this.operador_izq.ejecutar(entorno_padre, salida);
            let op2 = (this.operador_der == null) ? null : this.operador_der.ejecutar(entorno_padre, salida);
            let tipo_suma;
            if (op1 == null || op2 == null) {
                _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Operador vacio");
                return _return;
            }
            if (op1.getRol() != 0 /* valor */ || op1.getRol() != 1 /* arreglo */) {
                return op1;
            }
            if (op2.getRol() != 0 /* valor */ || op2.getRol() != 1 /* arreglo */) {
                return op2;
            }
            tipo_suma = this.matriz_operacion_suma[op1.getTipo().getTipo()][op2.getTipo().getTipo()];
            switch (tipo_suma) {
                case 0 /* suma_numero */:
                    _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(3 /* NUMERO */), "");
                    _return.setValor(Number(op1.getValor()) + Number(op2.getValor()));
                    return _return;
                case 20 /* concatenacion */:
                    _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(3 /* NUMERO */), "");
                    _return.setValor(op1.getValor().toString().concat(op2.getValor().toString()));
                    return _return;
                default:
                    _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("No es posible realizar una Suma del tipo: " + op1.getTipo().getTraduccion() + " + " + op2.getTipo().getTraduccion());
                    return _return;
            }
        }
        catch (Exception) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Operacion Suma: " + Exception.Message);
            return _return;
        }
    }
    getThis() {
        return new Suma(this.fila, this.columna, this.operador_izq.getThis(), this.operador_der.getThis());
    }
}
exports.default = Suma;
//# sourceMappingURL=Suma.js.map