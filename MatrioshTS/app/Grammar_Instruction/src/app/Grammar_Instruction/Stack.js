"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Simbolo_1 = require("./Simbolo");
const Tipo_1 = require("./Tipo");
const Funcion_Log_1 = require("./Funcion_Log");
class Stack extends Array {
    //este objeto tiene metodo pop para
    //Eliminar el ultimo de la lista
    //este objeto tiene metodo push para
    //Eliminar el ultimo de la lista
    _push(p_fila, p_columna, p_entorno_actual) {
        var object_console;
        object_console = new Simbolo_1.default(2 /* type */, new Tipo_1.default(5 /* IDENTIFICADOR */, "console"), "console");
        var funcion_log;
        funcion_log = new Funcion_Log_1.default(p_fila, p_columna);
        object_console.getListaFunciones().push(funcion_log);
        p_entorno_actual.set("console", object_console);
        this.push(p_entorno_actual);
    }
    existsSimbolo(key) {
        let _return = false;
        for (var x = (this.length - 1); x >= 0; x--) {
            let entorno_local = this[x];
            if (entorno_local.has(key)) {
                return true;
            }
        }
        return _return;
    }
    getSimbolo(key) {
        let _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
        _return.setValor("El valor no existe en ningun ámbito");
        for (var x = (this.length - 1); x >= 0; x--) {
            let entorno_local = this[x];
            if (entorno_local.has(key)) {
                _return = entorno_local.get(key);
                break;
            }
        }
        return _return;
    }
}
exports.default = Stack;
//# sourceMappingURL=Stack.js.map