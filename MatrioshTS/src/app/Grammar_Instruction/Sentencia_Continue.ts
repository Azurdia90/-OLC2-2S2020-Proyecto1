import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Sentencia_Continue extends Instruction
{
    constructor(p_fila : number, p_columna : number)
    {
        super(p_fila,p_columna);
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        var _result: Simbolo;
        _result = new Simbolo(tipo_rol.continuar,new Tipo(tipo_dato.CADENA), "");
        _result.setFila(this.fila);
        _result.setColumna(this.columna);
        _result.setValor("Sentencia Continuar");
        return _result;
    }

    public getThis()
    {
        return new Sentencia_Continue(this.fila,this.columna);
    }
}
export default Sentencia_Continue;