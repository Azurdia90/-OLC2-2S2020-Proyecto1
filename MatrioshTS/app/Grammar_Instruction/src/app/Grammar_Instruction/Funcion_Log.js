"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Funcion_1 = require("./Funcion");
const Simbolo_1 = require("./Simbolo");
const Tipo_1 = require("./Tipo");
class Funcion_Log extends Funcion_1.default {
    constructor(p_fila, p_columna) {
        super(p_fila, p_columna, "log", new Array(), undefined);
    }
    pasarParametros(lista_parametros_enviados, salida) {
        let _return;
        if (lista_parametros_enviados.length == 0) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Función Log: valor vacio");
            return _return;
        }
        else if (lista_parametros_enviados.length > 1) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Función Log: se envió mas de un valor");
            return _return;
        }
        else {
            this.valor_imprimir = lista_parametros_enviados[0];
        }
    }
    ejecutar(entorno_local, salida) {
        let _return;
        try {
            if (this.valor_imprimir.getRol() == 0 /* valor */) {
                salida.setInput(this.valor_imprimir.tostring());
            }
            else if (this.valor_imprimir.getRol() == 1 /* arreglo */) {
                var contenido = "[";
                for (var x = 0; x < this.valor_imprimir.getValor().length; x++) {
                    if (x > 0) {
                        if (this.valor_imprimir.getValor()[x].getRol() == 1 /* arreglo */) {
                            contenido.concat("," + this.printlist(this.valor_imprimir.getValor()[x]));
                        }
                        else if (this.valor_imprimir.getValor()[x].getRol() == 2 /* type */) {
                            contenido.concat("," + this.valor_imprimir.getValor()[x].tostring());
                        }
                        else {
                            contenido.concat("," + this.valor_imprimir.getValor()[x].tostring());
                        }
                    }
                    else {
                        if (this.valor_imprimir.getValor()[x].getRol() == 1 /* arreglo */) {
                            contenido.concat('' + this.printlist(this.valor_imprimir.getValor()[x].toString()));
                        }
                        else if (this.valor_imprimir.getValor()[x].getRol() == 2 /* type */) {
                            contenido.concat(this.valor_imprimir.getValor()[x].tostring());
                        }
                        else {
                            contenido.concat(this.valor_imprimir.getValor()[x].totring());
                        }
                    }
                }
                contenido.concat("]");
                salida.setOuput(contenido);
            }
            else if (this.valor_imprimir.getRol() == 2 /* type */) {
                salida.setOuput(this.valor_imprimir.toString());
            }
            else {
                salida.setOuput("Excepción: Tipo de dato no recnocido, fila: " + this.fila + " columna: " + this.columna);
            }
            _return = new Simbolo_1.default(5 /* aceptado */, new Tipo_1.default(4 /* CADENA */), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Imprimir: Sentencia realizada correctamente.");
            return _return;
        }
        catch (Exception) {
            _return = new Simbolo_1.default(9 /* error */, new Tipo_1.default(4 /* CADENA */), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error en Sentencia Imprimir: " + Exception);
            return _return;
        }
    }
    printlist(sim_list) {
        let lista_tmp = "[";
        for (var x = 0; x < sim_list.getValor().length; x++) {
            if (x > 0) {
                if ((sim_list.getValor()[x]).getRol() == 1 /* arreglo */) {
                    lista_tmp.concat("," + this.printlist(sim_list.getValor()[x]));
                }
                else if ((sim_list.getValor()[x]).getRol() == 2 /* type */) {
                    lista_tmp.concat("," + (sim_list.getValor()[x]).tostring());
                }
                else {
                    lista_tmp.concat("," + (sim_list.getValor()[x]).tostring());
                }
            }
            else {
                if ((sim_list.getValor()[x]).getRol() == 1 /* arreglo */) {
                    lista_tmp.concat('' + this.printlist(sim_list.getValor()[x]));
                }
                else if ((sim_list.getValor()[x]).getRol() == 2 /* type */) {
                    lista_tmp.concat((sim_list.getValor()[x]).tostring());
                }
                else {
                    lista_tmp.concat((sim_list.getValor()[x]).tostring());
                }
            }
        }
        lista_tmp.concat("]");
        return lista_tmp;
    }
    getThis() {
        return new Funcion_Log(this.fila, this.columna);
    }
}
exports.default = Funcion_Log;
//# sourceMappingURL=Funcion_Log.js.map