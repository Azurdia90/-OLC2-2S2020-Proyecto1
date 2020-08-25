import Expresion from './Expresion';
import Tipo from './Tipo';
import Simbolo from './Simbolo';
import Middle from './Middle';

class Dato_Primitivo extends Expresion
{
    constructor(p_fila : number, p_columna : number, p_tipo : Tipo, p_valor : String) {
        super(p_fila, p_columna, tipo_operacion.VALOR, undefined, undefined, p_tipo, p_valor);
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        
        try
        {
            if(this.tipo.getTipo() == tipo_dato.NULO)
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NULO),"");
                _return.setValor("null");
                return _return;
            }
            else if(this.tipo.getTipo() == tipo_dato.BOOLEANO)
            {
                if(this.valor = "true")
                {
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");
                    _return.setValor(true);
                    return _return;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");
                    _return.setValor(false);
                    return _return;
                }
            }
            else if(this.tipo.getTipo() == tipo_dato.NUMERO)
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO),"");
                _return.setValor(Number(this.valor));
                return _return;
            }
            else if(this.tipo.getTipo() == tipo_dato.CADENA)
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA),"");
                _return.setValor(this.valor.substring(1,this.valor.length - 1));
                return _return;
            }                

            else if(this.tipo.getTipo() == tipo_dato.IDENTIFICADOR)
            {   /*             
                if(entorno_actual.containsKey(valor))
                {                    
                    return entorno_actual.get(valor);
                }
                else
                {   
                    return Tabla_Simbolos.getInstance().getStack().buscarSimbolo(valor);                    
                }   
                */        
               return undefined;     
            }                                
            else
            {
                _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("No pudo ser reconocido el tipo de dato");
                return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error generación de valor Primitivo: " + Exception.Message);
            return _return;
        }
    }  
    
    public getThis() 
    {
        return new Dato_Primitivo(this.fila, this.columna, this.tipo, this.valor);
    }

}
export default Dato_Primitivo;