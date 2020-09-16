import Instruction from './Instruction';
import Middle from './Middle';
import Simbolo from './Simbolo';


class Type_MatrioshTS extends Instruction
{
    private identificador : String;
    private lista_atributos_tmp: Array<JSON>;
    private lista_atributos: Array<Simbolo>;

    constructor(p_fila: number, p_columna: number, p_id: String, p_lista_atributos_tmp: Array<JSON>)
    {
        super(p_fila, p_columna);
        this.identificador = p_id;
        this.lista_atributos_tmp = p_lista_atributos_tmp;
    }

    public getFila()
    {
        return this.fila;
    }

    public getColumna()
    {
        return this.columna;
    }

    public getIdentificador()
    {
        return this.identificador;
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle)
    {

    }

    public getThis()
    {
        new Type_MatrioshTS(this.fila,this.columna,this.identificador,this.lista_atributos_tmp);
    }

}

export default Type_MatrioshTS;