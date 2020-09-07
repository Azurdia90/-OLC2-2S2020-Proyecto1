import Expresion from './Expresion';
import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Operador_Incremento extends Expresion
{
    constructor(p_fila : number, p_columna: number, p_operador_izq : Instruction) {
        super(p_fila,p_columna,tipo_operacion.SUMA,p_operador_izq);
    }
    
    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        let _return : Simbolo;

        try
        {
            let op1 : Simbolo = (this.operador_izq == null) ? null : this.operador_izq.ejecutar(entorno_padre, salida);

            if (op1 == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Operador vacio");
                return _return;
            }

            if (op1.getRol() != tipo_rol.valor && op1.getRol() != tipo_rol.arreglo)
            {
                return op1;
            }

            if (!(op1.getTipo().getTipo() == tipo_dato.NUMERO))
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("No es posible realizar Operador Incremento con valores no numericos.");
                return _return;
            }
            else
            {
                let valor : Number = new Number(op1.getValor().toString());
                
                if(valor == undefined)
                {
                    valor = 0;
                }
                else 
                {
                    valor = valor.valueOf() + 1;
                }
                
                op1.setValor(valor);
                
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO),"");                
                _return.setValor(op1.getValor());
                return _return;
            }

        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Operador Incremento: " + Exception.Message);
            return _return;
        }
    }
    
    public getThis() 
    {
        return new Operador_Incremento(this.fila,this.columna,this.operador_izq.getThis());
    }
}

export default Operador_Incremento;