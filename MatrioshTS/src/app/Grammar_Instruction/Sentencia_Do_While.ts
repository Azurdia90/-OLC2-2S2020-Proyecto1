import Instruction from "./Instruction";
import Middle from './Middle';
import Simbolo from './Simbolo';
import Tabla_Simbolos from './Tabla_Simbolos';
import Tipo from './Tipo';

class Sentencia_Do_While extends Instruction
{
    private sentencia_comparacion: Instruction;
    private lista_sentencias: Array<Instruction>;
    
    constructor(p_linea: number, p_columna : number , p_sentencia_comparacion : Instruction, p_lista_sentencias : Array<Instruction>)
    {
        super(p_linea,p_columna);

        this.sentencia_comparacion = p_sentencia_comparacion;        
        this.lista_sentencias = p_lista_sentencias;
    }

    public ejecutar(entorno_padre : Map<String, Simbolo> , salida : Middle)
    {
        let _return : Simbolo;
        let tmp_val : Simbolo;

        try
        {
            do
            {
                let entorno_actual: Map<String, Simbolo> = new Map<String, Simbolo>();
                Tabla_Simbolos.getInstance().getStack()._push(this.fila,this.columna,entorno_actual);

                var val_sentencia: Simbolo;
                console.log(this.lista_sentencias);
                for(var x = 0; x <  this.lista_sentencias.length; x++)
                {                    
                    val_sentencia = this.lista_sentencias[x].ejecutar(entorno_actual,salida);

                    if (val_sentencia.getRol() == tipo_rol.error)
                    {                        
                        _return = val_sentencia;
                        Tabla_Simbolos.getInstance().getStack().pop();
                        return _return;
                    }
                    else if (val_sentencia.getRol() == tipo_rol.detener)
                    {     
                        _return = val_sentencia;                    
                        break;
                    }
                    else if (val_sentencia.getRol() == tipo_rol.continuar)
                    {   
                        _return = val_sentencia;                     
                        break;
                    }
                    else if (val_sentencia.getRol() == tipo_rol.retornar)
                    {
                        _return = val_sentencia;
                        Tabla_Simbolos.getInstance().getStack().pop();                        
                        return _return;
                    }
                    else
                    {     
                        _return = val_sentencia;
                        continue;
                    }       
                }  

                Tabla_Simbolos.getInstance().getStack().pop();

                if(_return.getRol() == tipo_rol.detener)
                {
                    _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Sentencia Do While Ejecutada correctamente");  
                    return _return;
                }                 

                tmp_val = (this.sentencia_comparacion == null) ? null : this.sentencia_comparacion.ejecutar(entorno_padre,salida);

                if (tmp_val == null)
                {
                    _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Sentencia Do While: Expresión comparación vacia");
                    return _return;
                }
    
                if(tmp_val.getRol() != tipo_rol.valor)
                {
                    return tmp_val;
                }
    
                if(tmp_val.getTipo().getTipo() != tipo_dato.BOOLEANO)
                {
                    _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("No es posible realizar Sentencia Do While, expresión no da como resultado un valor booleano.");
                    return _return;
                }
            }
            while(<Boolean>(tmp_val.getValor()))         
                       
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Sentencia Do While Ejecutada correctamente");  
            return _return;
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error Sentencia Do While: " + Exception.Message);
            return _return;
        }
    }

    public getThis() 
    {
        var clon_lista_sentencias: Array<Instruction> = new Array<Instruction>();
        
        for(var x = 0; x < this.lista_sentencias.length; x++)
        {
            clon_lista_sentencias.push(this.lista_sentencias[x].getThis());
        }
        
        return new Sentencia_Do_While(this.fila,this.columna,this.sentencia_comparacion.getThis(),clon_lista_sentencias);
    }
}

export default Sentencia_Do_While;