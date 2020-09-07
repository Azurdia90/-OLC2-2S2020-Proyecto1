"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Simbolo {
    constructor(p_rol, p_tipo, p_id) {
        this.acceso = 0 /* PUBLICO */;
        this.rol = p_rol;
        this.tipo = p_tipo;
        this.identificador = p_id;
        this.valor = undefined;
        this.constante = false;
    }
    getFila() {
        return this.fila;
    }
    setFila(fila) {
        this.fila = fila;
    }
    getColumna() {
        return this.columna;
    }
    setColumna(columna) {
        this.columna = columna;
    }
    getRol() {
        return this.rol;
    }
    getTipo() {
        return this.tipo;
    }
    getIdentificador() {
        return this.identificador;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getConstante() {
        return this.constante;
    }
    setConstante(p_constante) {
        this.constante = p_constante;
    }
    /*
    public Object getFirstValor() {
        return valor.get(0);
    }

    public void setFirstValor(Object valor) {
        if(this.valor.size() > 0)
        {
            this.valor.set(0, valor);
        }
        else
        {
            this.valor.add(0, valor);
        }
    }
    
    public void concatValor(ArrayList<Object> valor) {
        for(int x = 0; x < valor.size(); x++)
        {
            this.valor.add(valor.get(x));
        }
    }
    */
    toString() {
        return this.valor.toString();
    }
}
exports.default = Simbolo;
//# sourceMappingURL=Simbolo.js.map
//# sourceMappingURL=Simbolo.js.map