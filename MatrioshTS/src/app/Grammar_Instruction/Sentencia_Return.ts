import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Sentencia_Return extends Instruction
{
    private valor : Instruction;

    constructor(p_fila : number, p_columna : number, p_valor? : Instruction)
    {
        super(p_fila,p_columna);
        this.valor = p_valor;
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        var _return: Simbolo;
        var _return_tmp  : Simbolo;
        try
        {
            if(this.valor != undefined)
            {
                _return_tmp = this.valor.ejecutar(entorno_padre, salida);
                //console.log(_return_tmp);
                _return = new Simbolo(tipo_rol.retornar,_return_tmp.getTipo(), "");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor(_return_tmp);
                return  _return;
            }
            else
            {
                var simbolo_retorno = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.VOID), "");
                simbolo_retorno.setValor("null");

                _return = new Simbolo(tipo_rol.retornar,new Tipo(tipo_dato.CADENA), "");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor(simbolo_retorno);
                return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("No pudo ser reconocido el tipo de dato");
            return _return;
        }
    }

    public getThis()
    {
        return new Sentencia_Return(this.fila,this.columna, this.valor == undefined ? undefined : this.valor.getThis());
    }
}
export default Sentencia_Return;