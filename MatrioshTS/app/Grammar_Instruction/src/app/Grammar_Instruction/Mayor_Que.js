"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expresion_1 = require("./Expresion");
const Simbolo_1 = require("./Simbolo");
const Tipo_1 = require("./Tipo");
class Mayor_Que extends Expresion_1.default {
    constructor(p_fila, p_columna, p_operador_izq, p_operador_der) {
        super(p_fila, p_columna, 8 /* MAYOR_QUE */, p_operador_izq, p_operador_der);
        this.matriz_operacion_mayor_que = [
            [57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */],
            /*nulo*/ [57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */],
            /*booleano*/ [57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */],
            /*numero*/ [57 /* error */, 57 /* error */, 57 /* error */, 22 /* mayorque_numerico */, 26 /* mayorque_cadena_numerico */, 57 /* error */, 57 /* error */],
            /*String*/ [57 /* error */, 57 /* error */, 57 /* error */, 26 /* mayorque_cadena_numerico */, 24 /* mayorque_cadena */, 57 /* error */, 57 /* error */],
            /*identificador*/ [57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */],
            /*error*/ [57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */, 57 /* error */],
        ];
    }
    ejecutar(entorno_padre, salida) {
        let _return;
        try {
            let op1 = (this.operador_izq == null) ? null : this.operador_izq.ejecutar(entorno_padre, salida);
            let op2 = (this.operador_der == null) ? null : this.operador_der.ejecutar(entorno_padre, salida);
            let tipo_mayor_que;
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
            tipo_mayor_que = this.matriz_operacion_mayor_que[op1.getTipo().getTipo()][op2.getTipo().getTipo()];
            switch (tipo_mayor_que) {
                case 22 /* mayorque_numerico */:
                    _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(2 /* BOOLEANO */), "");
                    _return.setValor(Number(op1.getValor()) > Number(op2.getValor()));
                    return _return;
                case 26 /* mayorque_cadena_numerico */:
                    var numero = 0;
                    for (var i = 0; i < op1.getValor.toString().length; i++) {
                        numero = numero + Number(op1.getValor().toString().charAt(i));
                    }
                    _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(2 /* BOOLEANO */), "");
                    _return.setValor(numero > Number(op2.getValor()));
                    return _return;
                case 25 /* mayorque_numerico_cadena */:
                    var numero = 0;
                    for (var i = 0; i < op2.getValor.toString().length; i++) {
                        numero = numero + Number(op2.getValor().toString().charAt(i));
                    }
                    _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(2 /* BOOLEANO */), "");
                    _return.setValor(Number(op1.getValor()) > numero);
                    return _return;
                case 24 /* mayorque_cadena */:
                    var numero1 = 0;
                    for (var i = 0; i < op1.getValor.toString().length; i++) {
                        numero = numero + Number(op1.getValor().toString().charAt(i));
                    }
                    var numero2 = 0;
                    for (var i = 0; i < op2.getValor.toString().length; i++) {
                        numero2 = numero2 + Number(op2.getValor().toString().charAt(i));
                    }
                    _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(2 /* BOOLEANO */), "");
                    _return.setValor(numero1 > numero2);
                    return _return;
                default:
                    _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("No es posible realizar una Comparación Mayor Que del tipo: " + op1.getTipo().getTraduccion() + " * " + op2.getTipo().getTraduccion());
                    return _return;
            }
        }
        catch (Exception) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Operacion Mayor Que: " + Exception.Message);
            return _return;
        }
    }
    getThis() {
        return new Mayor_Que(this.fila, this.columna, this.operador_izq.getThis(), this.operador_der.getThis());
    }
}
exports.default = Mayor_Que;
//# sourceMappingURL=Mayor_Que.js.map