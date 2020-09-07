"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = require("./Stack");
class Tabla_Simbolos {
    constructor() {
        this.stack = new Stack_1.default();
        this.entorno_global = new Map();
        this.lista_instrucciones = new Array();
        this.lista_funciones = new Array();
        this.stack.push(this.entorno_global);
    }
    /**********************METODOS DE SINGLETON********************************/
    static getInstance() {
        if (this.instance != null) {
            return this.instance;
        }
        else {
            this.instance = new Tabla_Simbolos();
            return this.instance;
        }
    }
    /******************FIN METODOS DE SINGLETON********************************/
    /*********************METODOS DE LA CLASE**********************************/
    clear() {
        this.entorno_global.clear();
        this.lista_instrucciones = new Array();
        this.lista_funciones = new Array();
    }
    existFuncion(p_identificador) {
        let _return = false;
        for (var x = 0; x < this.lista_funciones.length; x++) {
            let funcion_actual = this.lista_funciones[x];
            if (funcion_actual.getIdentificador() == p_identificador) {
                return true;
            }
        }
        return _return;
    }
    getFuncion(p_identificador) {
        let _return;
        for (var x = 0; x < this.lista_funciones.length; x++) {
            let funcion_actual = this.lista_funciones[x];
            if (funcion_actual.getIdentificador() == p_identificador) {
                return funcion_actual.getThis();
            }
        }
        return _return;
    }
    /*********************FIN DE METODOS DE LA CLASE***************************/
    /***********************METODOS GET Y SET**********************************/
    getEntorno_global() {
        return this.entorno_global;
    }
    setEntorno_global(entorno_global) {
        this.entorno_global = entorno_global;
    }
    getStack() {
        return this.stack;
    }
    setStack(stack) {
        this.stack = stack;
    }
    getLista_instrucciones() {
        return this.lista_instrucciones;
    }
    setLista_instrucciones(lista_instrucciones) {
        this.lista_instrucciones = lista_instrucciones;
    }
    getLista_funciones() {
        return this.lista_funciones;
    }
    setLista_funciones(lista_funciones) {
        this.lista_funciones = lista_funciones;
    }
}
Tabla_Simbolos.instance = new Tabla_Simbolos();
exports.default = Tabla_Simbolos;
//# sourceMappingURL=Tabla_Simbolos.js.map
//# sourceMappingURL=Tabla_Simbolos.js.map