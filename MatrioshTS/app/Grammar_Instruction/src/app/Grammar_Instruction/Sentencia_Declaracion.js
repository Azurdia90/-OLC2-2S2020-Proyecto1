"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruction_1 = require("./Instruction");
const Tipo_1 = require("./Tipo");
const Simbolo_1 = require("./Simbolo");
class Sentencia_Declaracion extends Instruction_1.default {
    constructor(p_fila, p_columna, p_lista_id, p_valor, p_tipo) {
        super(p_fila, p_columna);
        this.identificadores = p_lista_id;
        this.valor = p_valor;
        this.tipo = p_tipo;
        this.const = false;
        this.valor_ext = undefined;
    }
    ejecutar(entorno_padre, salida) {
        let _return;
        let _val_fin;
        try {
            if (this.valor == undefined && this.valor_ext == undefined) {
                _val_fin = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(1 /* NULO */), "");
                _val_fin.setValor("null");
            }
            else if (this.valor == undefined && this.valor_ext != undefined) {
                _val_fin = this.valor_ext;
            }
            else if (this.valor != undefined && this.valor_ext == undefined) {
                _val_fin = this.valor.ejecutar(entorno_padre, salida);
            }
            else {
                _val_fin = this.valor.ejecutar(entorno_padre, salida);
            }
            if (_val_fin.getRol() != 0 /* valor */ || _val_fin.getRol() != 1 /* arreglo */) {
                return _val_fin;
            }
            if (this.tipo != undefined) {
                if (this.tipo.getTipo() != _val_fin.getTipo().getTipo()) {
                    var nuevo_simbolo = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    nuevo_simbolo.setValor("El tipo de la variable es diferente al valor a asignar.");
                    nuevo_simbolo.setFila(this.fila);
                    nuevo_simbolo.setColumna(this.columna);
                    return nuevo_simbolo;
                }
            }
            for (var cont = 0; cont < this.identificadores.length - 1; cont++) {
                if (entorno_padre.has(this.identificadores[cont])) {
                    var nuevo_simbolo = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    nuevo_simbolo.setValor("La variable: \"" + this.identificadores[cont] + "\" ya se encuentra en el entorno local.");
                    nuevo_simbolo.setFila(this.fila);
                    nuevo_simbolo.setColumna(this.columna);
                    return nuevo_simbolo;
                }
                else {
                    var nuevo_simbolo = new Simbolo_1.default(0 /* valor */, _val_fin.getTipo(), this.identificadores[cont]);
                    nuevo_simbolo.setValor(_val_fin.getValor());
                    nuevo_simbolo.setConstante(this.const);
                    entorno_padre.set(this.identificadores[cont], nuevo_simbolo);
                }
            }
            var simbolo_aceptado = new Simbolo_1.default(5 /* aceptado */, new Tipo_1.default(4 /* CADENA */), "10-4");
            nuevo_simbolo.setValor("Declaración Succesful");
            nuevo_simbolo.setFila(this.fila);
            nuevo_simbolo.setColumna(this.columna);
            return nuevo_simbolo;
        }
        catch (Exception) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Sentencia Declaración: " + Exception.Message);
            return _return;
        }
    }
    getThis() {
        let sentencia_declaracion = new Sentencia_Declaracion(this.fila, this.columna, this.identificadores);
        if (this.valor != undefined) {
            sentencia_declaracion.setValor(this.valor);
        }
        if (this.tipo != undefined) {
            sentencia_declaracion.setTipo(this.tipo);
        }
        return sentencia_declaracion;
    }
    getValor() {
        return this.valor;
    }
    setValor(p_valor) {
        this.valor = p_valor;
    }
    setValor_Ext(p_valor) {
        this.valor_ext = p_valor;
    }
    setTipo(p_tipo) {
        this.tipo = p_tipo;
    }
    setConst() {
        this.const = true;
    }
}
exports.default = Sentencia_Declaracion;
//# sourceMappingURL=Sentencia_Declaracion.js.map