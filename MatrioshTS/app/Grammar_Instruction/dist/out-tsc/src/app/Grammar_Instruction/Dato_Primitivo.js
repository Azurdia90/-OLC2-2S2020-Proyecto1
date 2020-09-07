"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expresion_1 = require("./Expresion");
const Tipo_1 = require("./Tipo");
const Simbolo_1 = require("./Simbolo");
class Dato_Primitivo extends Expresion_1.default {
    constructor(p_fila, p_columna, p_tipo, p_valor) {
        super(p_fila, p_columna, 0 /* VALOR */, undefined, undefined, p_tipo, p_valor);
    }
    ejecutar(entorno_padre, salida) {
        let _return;
        try {
            if (this.tipo.getTipo() == 1 /* NULO */) {
                _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(1 /* NULO */), "");
                _return.setValor("null");
                return _return;
            }
            else if (this.tipo.getTipo() == 2 /* BOOLEANO */) {
                if (this.valor = "true") {
                    _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(2 /* BOOLEANO */), "");
                    _return.setValor(true);
                    return _return;
                }
                else {
                    _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(2 /* BOOLEANO */), "");
                    _return.setValor(false);
                    return _return;
                }
            }
            else if (this.tipo.getTipo() == 3 /* NUMERO */) {
                _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(3 /* NUMERO */), "");
                _return.setValor(Number(this.valor));
                return _return;
            }
            else if (this.tipo.getTipo() == 4 /* CADENA */) {
                _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(4 /* CADENA */), "");
                _return.setValor(this.valor.substring(1, this.valor.length - 1));
                return _return;
            }
            else if (this.tipo.getTipo() == 5 /* IDENTIFICADOR */) { /*
                if(entorno_actual.containsKey(valor))
                {
                    return entorno_actual.get(valor);
                }
                else
                {
                    return Tabla_Simbolos.getInstance().getStack().buscarSimbolo(valor);
                }
                */
                return undefined;
            }
            else {
                _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("No pudo ser reconocido el tipo de dato");
                return _return;
            }
        }
        catch (Exception) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error generación de valor Primitivo: " + Exception.Message);
            return _return;
        }
    }
    getThis() {
        return new Dato_Primitivo(this.fila, this.columna, this.tipo, this.valor);
    }
}
exports.default = Dato_Primitivo;
//# sourceMappingURL=Dato_Primitivo.js.map
//# sourceMappingURL=Dato_Primitivo.js.map