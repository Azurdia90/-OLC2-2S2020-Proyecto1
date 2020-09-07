"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Funcion_1 = require("./Funcion");
const Simbolo_1 = require("./Simbolo");
const Tipo_1 = require("./Tipo");
const Tabla_Simbolos_1 = require("./Tabla_Simbolos");
class Funcion_Matriosh extends Funcion_1.default {
    constructor(p_fila, p_columna, p_id, p_lista_parametros, p_lista_sentencias) {
        super(p_fila, p_columna, p_id, p_lista_parametros, p_lista_sentencias);
    }
    pasarParametros(lista_parametros_enviados, salida) {
        let _return;
        this.entorno_local = new Map();
        if (this.lista_parametros.length == lista_parametros_enviados.length) {
            for (var x = 0; x < this.lista_parametros.length; x++) {
                var declaracion_actual = this.lista_parametros[x];
                if (declaracion_actual.getValor() == null) {
                    declaracion_actual.setValor_Ext(lista_parametros_enviados[x]);
                }
                var _result = declaracion_actual.ejecutar(this.entorno_local, salida);
                if (_result.getRol() != 0 /* valor */ || _result.getRol() != 1 /* arreglo */) {
                    this.entorno_local = new Map();
                    return _result;
                }
            }
            _return = new Simbolo_1.default(5 /* aceptado */, new Tipo_1.default(4 /* CADENA */), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Paso de Parametros Succesful");
            return _return;
        }
        else {
            this.entorno_local = new Map();
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Cantidad de parametros enviados no coinciden con los de la función");
            return _return;
        }
    }
    ejecutar(entorno_padre, salida) {
        let _return;
        try {
            var _tmp_return;
            Tabla_Simbolos_1.default.getInstance().getStack()._push(this.fila, this.columna, this.entorno_local);
            //consolo.log("Se entro a un metodo cantidad de ambitos: " + Tabla_Simbolos.getInstance().getStack().size());
            for (var x = 0; x < this.lista_sentencias.length; x++) {
                _tmp_return = this.lista_sentencias[x].ejecutar(this.entorno_local, salida);
                if (_tmp_return.getRol() == 9 /* error */) {
                    _return = _tmp_return;
                    Tabla_Simbolos_1.default.getInstance().getStack().pop();
                    this.entorno_local = new Map();
                    return _return;
                }
                else if (_tmp_return.getRol() == 8 /* detener */) {
                    Tabla_Simbolos_1.default.getInstance().getStack().pop();
                    this.entorno_local = new Map();
                    _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Error en Funcion: No se permite el uso de sentencia break");
                    return _return;
                }
                else if (_tmp_return.getRol() == 6 /* continuar */) {
                    Tabla_Simbolos_1.default.getInstance().getStack().pop();
                    this.entorno_local = new Map();
                    _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Error en Funcion: No se permite el uso de sentencia continue");
                    return _return;
                }
                else if (_tmp_return.getRol() == 7 /* retornar */) {
                    _return = _tmp_return.getValor();
                    Tabla_Simbolos_1.default.getInstance().getStack().pop();
                    this.entorno_local = new Map();
                    //console.log("Se retorno de un metodo cantidad de ambitos: " + Tabla_Simbolos.getInstance().getStack().size());
                    return _return;
                }
                else {
                    _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(1 /* NULO */), "");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("null");
                    return _return;
                }
            }
            Tabla_Simbolos_1.default.getInstance().getStack().pop();
            this.entorno_local = new Map();
            _return = new Simbolo_1.default(0 /* valor */, new Tipo_1.default(1 /* NULO */), "");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("null");
            return _return;
        }
        catch (Exception) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error Funcion " + this.identificador + " : " + Exception);
            return _return;
        }
    }
    getThis() {
        var clon_lista_parametros = new Array();
        var clon_lista_sentencias = new Array();
        /*if(identificador.equalsIgnoreCase("agregarNotas"))
        {
            System.out.println("Ejecutando la función: " + identificador);
        }*/
        for (var x = 0; x < this.lista_parametros.length; x++) {
            clon_lista_parametros.push(this.lista_parametros[x].getThis());
        }
        for (var y = 0; y < this.lista_sentencias.length; y++) {
            clon_lista_sentencias.push(this.lista_sentencias[y].getThis());
        }
        return new Funcion_Matriosh(this.fila, this.columna, this.identificador, clon_lista_parametros, clon_lista_sentencias);
    }
}
exports.default = Funcion_Matriosh;
//# sourceMappingURL=Funcion_Matriosh.js.map