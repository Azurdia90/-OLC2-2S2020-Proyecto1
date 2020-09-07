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
                if (this.padre.getRol() == 1 /* arreglo */) {
                    var pos;
                    pos = this.expresion1.ejecutar(entorno_padre, salida);
                    if (pos.getRol() == 0 /* valor */ && pos.getTipo().getTipo() == 3 /* NUMERO */) {
                        var pos_rel;
                        pos_rel = Number(pos.getValor());
                        if (pos_rel < 0) {
                            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setValor("Error Operador Acceso: La posición del arreglo debe ser mayor o igual a 0.");
                            return _return;
                        }
                        else if (pos_rel >= 0) {
                            if (this.padre.getValor().length > pos_rel) {
                                return this.padre.getValor()[pos_rel.valueOf()];
                            }
                            else {
                                _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                                _return.setFila(this.fila);
                                _return.setColumna(this.columna);
                                _return.setValor("Error Operador Acceso: La posición del arreglo es mayor al tamaño del arreglo.");
                                return _return;
                            }
                        }
                    }
                    else {
                        _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setValor("Error Operador Acceso: La posición del arreglo debe ser un valor númerico.");
                        return _return;
                    }
                }
                else {
                    _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Error Operador Acceso: Este tipo de acceso es válido unicamente para arreglos.");
                    return _return;
                }
            }
            else if (this.tipo == 1) {
                if (this.padre.getRol() == 2 /* type */) {
                    var type_rel;
                    type_rel = this.padre.getValor();
                    if (type_rel.has(this.expresion3)) {
                        return type_rel.get(this.expresion3);
                    }
                    else {
                        _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setValor("Error Operador Acceso: Este atributo no existe aún.");
                        return _return;
                    }
                }
                else {
                    _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Error Operador Acceso: Este tipo de acceso es válido unicamente para Types.");
                    return _return;
                }
            }
            else if (this.tipo == 2) {
                if (this.padre.getRol() == 2 /* type */) {
                    this.expresion2.setGlobal(false);
                    this.expresion2.setPadre(this.padre);
                    _return = this.expresion2.ejecutar(entorno_padre, salida);
                    return _return;
                }
                else {
                    _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Error Operador Acceso: Este tipo de acceso es válido unicamente para Types.");
                    return _return;
                }
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
    getPadre() {
        return this.padre;
    }
    setPadre(padre) {
        this.padre = padre;
    }
    getThis() {
        return new Tipo_Acceso(this.fila, this.columna, this.tipo, this.expresion1 == undefined ? null : this.expresion1.getThis(), this.expresion2 == undefined ? null : this.expresion2.getThis(), this.expresion3 == undefined ? undefined : this.expresion3);
    }
}
exports.default = Tipo_Acceso;
//# sourceMappingURL=Tipo_Acceso.js.map