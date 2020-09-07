"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Simbolo_1 = require("./Simbolo");
const Tipo_1 = require("./Tipo");
class Stack extends Array {
    //este objeto tiene metodo pop para
    //Eliminar el ultimo de la lista
    //este objeto tiene metodo push para
    //Eliminar el ultimo de la lista
    //buscar en todos los ambitos ingresados
    buscarSimbolo(key) {
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
//# sourceMappingURL=Stack.js.map