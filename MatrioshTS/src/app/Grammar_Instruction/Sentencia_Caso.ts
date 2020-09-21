import Instruction from "./Instruction";
import Middle from './Middle';
import Simbolo from './Simbolo';
import Tabla_Simbolos from './Tabla_Simbolos';
import Tipo from './Tipo';

class Sentencia_Caso extends Instruction
{
    private default: Boolean;
    private valor_padre: Simbolo;
    private valor_comparacion : Instruction;
    private lista_sentencias: Array<Instruction>;
    
    constructor(p_linea: number, p_columna : number , p_defecto: Boolean, p_valor_comparacion : Instruction, p_lista_sentencias : Array<Instruction>)
    {
        super(p_linea,p_columna);

        this.default = p_defecto;
        this.valor_comparacion = p_valor_comparacion;        
        this.lista_sentencias = p_lista_sentencias;
    }

    public setValorPadre(p_padre: Simbolo)
    {
        this.valor_padre = p_padre;
    }

    public ejecutar(entorno_padre : Map<String, Simbolo> , salida : Middle)
    {
        let _return : Simbolo;
        let tmp_val : Simbolo;

        try
        {
            if(!this.default)
            {
                tmp_val = (this.valor_comparacion == null) ? null : this.valor_comparacion.ejecutar(entorno_padre,salida);

                if (tmp_val == null)
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Sentencia Switch: Expresión comparación vacia");
                    return _return;
                }
    
                if(tmp_val.getRol() != tipo_rol.valor)
                {
                    return tmp_val;
                }
    
                if (this.valor_padre == null)
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Sentencia Switch: Expresión comparación vacia");
                    return _return;
                }
    
                if(this.valor_padre.getRol() != tipo_rol.valor)
                {
                    return tmp_val;
                }
    
                if(this.valor_padre.getTipo().getTipo() != tmp_val.getTipo().getTipo()
                )
                {
                    _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("No es posible realizar Sentencia Switch, los tipos de los valores a comparar no son los mismos.");
                    return _return;
                }
            }
            else
            {
                tmp_val = this.valor_padre;
            }

            if(this.valor_padre.getValor() == tmp_val.getValor())
            {
                let entorno_actual: Map<String, Simbolo> = new Map<String, Simbolo>();
                Tabla_Simbolos.getInstance().getStack()._push(this.fila,this.columna,entorno_actual);
    
                var val_sentencia: Simbolo;
                
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
                        Tabla_Simbolos.getInstance().getStack().pop();                   
                        return _return;
                    }
                    else if (val_sentencia.getRol() == tipo_rol.continuar)
                    {   
                        _return = val_sentencia;                     
                        Tabla_Simbolos.getInstance().getStack().pop();                   
                        return _return;
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

                _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Sentencia Caso Ejecutada correctamente");  
                return _return;
                
            }
            else
            {
                _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Sentencia Caso Ejecutada correctamente");  
                return _return;
            }                               
            
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error Sentencia Switch: " + Exception.Message);
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
        
        return new Sentencia_Caso(this.fila,this.columna,this.default,this.valor_comparacion == undefined ? undefined : this.valor_comparacion.getThis(),clon_lista_sentencias);
    }
}

export default Sentencia_Caso;