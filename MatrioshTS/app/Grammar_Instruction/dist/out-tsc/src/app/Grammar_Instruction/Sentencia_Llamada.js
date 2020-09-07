"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruction_1 = require("./Instruction");
const Simbolo_1 = require("./Simbolo");
const Tabla_Simbolos_1 = require("./Tabla_Simbolos");
const Tipo_1 = require("./Tipo");
class Sentencia_Llamada extends Instruction_1.default {
    constructor(p_fila, p_columna, p_identificador, p_lista_parametros) {
        super(p_fila, p_columna);
        this.identificador = p_identificador;
        this.lista_parametros = p_lista_parametros;
        this.lista_parametros_enviar = new Array();
    }
    ejecutar(entorno_padre, salida) {
        let funcion_actual;
        let _return;
        try {
            /*if(identificador.equalsIgnoreCase("agregarNotas"))
            {
                System.out.println("Lamando a la función: " + identificador);
            }*/
            funcion_actual = Tabla_Simbolos_1.default.getInstance().getFuncion(this.identificador);
            if (funcion_actual == null) {
                _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Sentencia Llamada: Funcion " + this.identificador + " no existe.");
                return _return;
            }
            //Llenamos la lista de parametros que se enviaran al metodo
            for (var x = 0; x < this.lista_parametros.length; x++) {
                var tmp_val = this.lista_parametros[x].ejecutar(entorno_padre, salida);
                if (tmp_val == null) {
                    _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Sentencia Llamada: Parametro Nulo");
                    return _return;
                }
                if (tmp_val.getRol() != 0 /* valor */ || tmp_val.getRol() != 1 /* arreglo */) {
                    this.lista_parametros_enviar = new Array();
                    return tmp_val;
                }
                this.lista_parametros_enviar.push(tmp_val);
            }
            var _result = funcion_actual.pasarParametros(this.lista_parametros_enviar, salida);
            this.lista_parametros_enviar = new Array();
            if (tmp_val.getRol() != 0 /* valor */ || tmp_val.getRol() != 1 /* arreglo */) {
                return _result;
            }
            _return = funcion_actual.ejecutar(entorno_padre, salida);
            return _return;
        }
        catch (Exception) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error Sentencia Llamada: " + Exception.Message);
            return _return;
        }
    }
    getThis() {
        var lista_clon = new Array();
        for (var x = 0; x < this.lista_parametros.length; x++) {
            lista_clon.push(this.lista_parametros[x].getThis());
        }
        return new Sentencia_Llamada(this.fila, this.columna, this.identificador, lista_clon);
    }
}
exports.default = Sentencia_Llamada;
//# sourceMappingURL=Sentencia_Llamada.js.map
//# sourceMappingURL=Sentencia_Llamada.js.map