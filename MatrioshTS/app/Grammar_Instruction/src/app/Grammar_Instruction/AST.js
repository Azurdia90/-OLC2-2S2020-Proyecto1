"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sentencia_Declaracion_1 = require("./Sentencia_Declaracion");
const Tipo_1 = require("./Tipo");
const Suma_1 = require("./Suma");
const Sentencia_Llamada_1 = require("./Sentencia_Llamada");
const Sentencia_Acceso_1 = require("./Sentencia_Acceso");
const Operador_Decremento_1 = require("./Operador_Decremento");
const Operador_Incremento_1 = require("./Operador_Incremento");
const Operador_Unario_1 = require("./Operador_Unario");
const Or_1 = require("./Or");
const Not_1 = require("./Not");
const And_1 = require("./And");
const Diferente_Que_1 = require("./Diferente_Que");
const Menor_Igual_Que_1 = require("./Menor_Igual_Que");
const Mayor_Igual_Que_1 = require("./Mayor_Igual_Que");
const Menor_Que_1 = require("./Menor_Que");
const Mayor_Que_1 = require("./Mayor_Que");
const Modulo_1 = require("./Modulo");
const Division_1 = require("./Division");
const Multiplicacion_1 = require("./Multiplicacion");
const Resta_1 = require("./Resta");
const Igual_Que_1 = require("./Igual_Que");
const Dato_Primitivo_1 = require("./Dato_Primitivo");
const Tipo_Acceso_1 = require("./Tipo_Acceso");
const Tabla_Simbolos_1 = require("./Tabla_Simbolos");
const Middle_1 = require("./Middle");
class AST {
    constructor(p_jason, p_import) {
        if (!p_import) {
            this.superjason = p_jason;
            this.lista_instrucciones = new Array();
        }
    }
    exec_ast() {
        Tabla_Simbolos_1.default.getInstance().clear();
        var _result;
        for (var ins = 0; ins < this.lista_instrucciones.length; ins++) {
            _result = this.lista_instrucciones[ins].ejecutar(Tabla_Simbolos_1.default.getInstance().getEntorno_global(), Middle_1.default.getInstance());
            console.log(_result);
        }
    }
    import_ast() {
    }
    build_ast() {
        for (var i = 0; i < this.superjason.length; i++) {
            this.lista_instrucciones.push(this.fabrica_instrucciones(this.superjason[i]));
        }
    }
    fabrica_instrucciones(instruccion_jason) {
        if (instruccion_jason['etiqueta'] == 'sentencia_declaracion') {
            return new Sentencia_Declaracion_1.default(instruccion_jason['linea'], instruccion_jason['columna'], instruccion_jason['identificador'], this.fabrica_expresiones(instruccion_jason['valor']), this.fabrica_tipo(instruccion_jason['tipo']));
        }
        else if (instruccion_jason['etiqueta'] == 'sentencia_acceso') {
            return new Sentencia_Acceso_1.default(instruccion_jason['fila'], instruccion_jason['columna'], instruccion_jason['identificador'], instruccion_jason['lista_acceso']);
        }
        else if (instruccion_jason['etiqueta'] == 'tipo_acceso') {
            return new Tipo_Acceso_1.default(instruccion_jason['fila'], instruccion_jason['columna'], instruccion_jason['tipo'], this.fabrica_expresiones(instruccion_jason['expresion1']), this.fabrica_expresiones(instruccion_jason['expresion2']), instruccion_jason['expresion3']);
        }
        else if (instruccion_jason['etiqueta'] == 'sentencia_llamada') {
            var lista_parametros;
            var parametro_jason;
            lista_parametros = new Array();
            for (var cont = 0; cont < instruccion_jason['lista_paramentros'].length; cont++) {
                parametro_jason = instruccion_jason['lista_paramentros'][cont];
                lista_parametros.push(this.fabrica_expresiones(parametro_jason));
            }
            return new Sentencia_Llamada_1.default(instruccion_jason['fila'], instruccion_jason['columna'], instruccion_jason['identificador'], instruccion_jason['lista_acceso']);
        }
        else {
            return undefined;
        }
    }
    fabrica_expresiones(expresion_jason) {
        if (expresion_jason['etiqueta'] == 'suma') {
            return new Suma_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'resta') {
            return new Resta_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'multiplicacion') {
            return new Multiplicacion_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'division') {
            return new Division_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'modulo') {
            return new Modulo_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'mayor_que') {
            return new Mayor_Que_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'menor_que') {
            return new Menor_Que_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'mayor_igual_que') {
            return new Mayor_Igual_Que_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'menor_igual_que') {
            return new Menor_Igual_Que_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'igual_que') {
            return new Igual_Que_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'diferente_que') {
            return new Diferente_Que_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'and') {
            return new And_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'or') {
            return new Or_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if (expresion_jason['etiqueta'] == 'not') {
            return new Not_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if (expresion_jason['etiqueta'] == 'operador_unario') {
            return new Operador_Unario_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if (expresion_jason['etiqueta'] == 'operador_incremento') {
            return new Operador_Incremento_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if (expresion_jason['etiqueta'] == 'operador_decremento') {
            return new Operador_Decremento_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if (expresion_jason['etiqueta'] == 'sentencia_acceso') {
            return new Sentencia_Acceso_1.default(expresion_jason['fila'], expresion_jason['columna'], expresion_jason['identificador'], expresion_jason['lista_acceso']);
        }
        else if (expresion_jason['etiqueta'] == 'tipo_acceso') {
            return new Tipo_Acceso_1.default(expresion_jason['fila'], expresion_jason['columna'], expresion_jason['tipo'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']), expresion_jason['expresion3']);
        }
        else if (expresion_jason['etiqueta'] == 'sentencia_llamada') {
            var lista_parametros;
            var parametro_jason;
            lista_parametros = new Array();
            for (var cont = 0; cont < expresion_jason['lista_paramentros'].length; cont++) {
                parametro_jason = expresion_jason['lista_paramentros'][cont];
                lista_parametros.push(this.fabrica_expresiones(parametro_jason));
            }
            return new Sentencia_Llamada_1.default(expresion_jason['fila'], expresion_jason['columna'], expresion_jason['identificador'], expresion_jason['lista_acceso']);
        }
        else if (expresion_jason['etiqueta'] == 'dato_primitivo') {
            return new Dato_Primitivo_1.default(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_tipo(expresion_jason['tipo']), expresion_jason['valor']);
        }
        else {
            return undefined;
        }
    }
    fabrica_tipo(tipo_jason) {
        if (tipo_jason == null) {
            return undefined;
        }
        if (tipo_jason['tipo'] == 0) {
            return new Tipo_1.default(0 /* VOID */);
        }
        else if (tipo_jason['tipo'] == 1) {
            return new Tipo_1.default(1 /* NULO */);
        }
        else if (tipo_jason['tipo'] == 2) {
            return new Tipo_1.default(2 /* BOOLEANO */);
        }
        else if (tipo_jason['tipo'] == 3) {
            return new Tipo_1.default(3 /* NUMERO */);
        }
        else if (tipo_jason['tipo'] == 4) {
            return new Tipo_1.default(4 /* CADENA */);
        }
        else if (tipo_jason['tipo'] == 5) {
            return new Tipo_1.default(5 /* IDENTIFICADOR */, tipo_jason['valor']);
        }
        else {
            undefined;
        }
    }
}
exports.default = AST;
//# sourceMappingURL=AST.js.map