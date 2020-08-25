import Expresion from './Expresion';
import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Not extends Expresion
{
    constructor(p_fila : number, p_columna: number, p_operador_izq : Instruction) {
        super(p_fila,p_columna,tipo_operacion.NOT,p_operador_izq);
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

            if (op1.getRol() != tipo_rol.valor || op1.getRol() != tipo_rol.arreglo)
            {
                return op1;
            }

            if (!(op1.getTipo().getTipo() == tipo_dato.BOOLEANO))
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("No es posible realizar Not con valores no booleanos.");
                return _return;
            }
            else
            {
                let valor1 : Boolean = new Boolean(op1.getValor());
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");                
                _return.setValor(!valor1);
                return _return;
            }

        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Operacion Not: " + Exception.Message);
            return _return;
        }
    }
    
    public getThis() 
    {
        return new Not(this.fila,this.columna,this.operador_izq.getThis());
    }
}

export default Not;