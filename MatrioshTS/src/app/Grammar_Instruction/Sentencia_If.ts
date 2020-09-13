import Instruction from "./Instruction";
import Middle from './Middle';
import Simbolo from './Simbolo';
import Tabla_Simbolos from './Tabla_Simbolos';
import Tipo from './Tipo';

class Sentencia_If extends Instruction
{
    private sentencia_comparacion: Instruction;
    private lista_sentencias_if: Array<Instruction>;
    private lista_else_if: Array<Instruction>;
    private lista_sentencias_else: Array<Instruction>;
    
    constructor(p_linea: number, p_columna : number , p_sentencia_comparacion : Instruction, p_lista_sentencias : Array<Instruction>, p_lista_else_if?: Array<Instruction>, p_else?: Array<Instruction>)
    {
        super(p_linea,p_columna);

        this.sentencia_comparacion = p_sentencia_comparacion;        
        this.lista_sentencias_if = p_lista_sentencias;
        
        this.lista_else_if = p_lista_else_if;
        this.lista_sentencias_else = p_else;
    }

    public ejecutar(entorno_padre : Map<String, Simbolo> , salida : Middle)
    {
        let _return : Simbolo;
        let tmp_val : Simbolo
        try
        {
            tmp_val = (this.sentencia_comparacion == null) ? null : this.sentencia_comparacion.ejecutar(entorno_padre,salida);

            if (tmp_val == null)
            {
                _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Sentencia If: Expresión comparación vacia");
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
                _return.setValor("No es posible realizar Sentencia If, expresión no da como resultado un valor booleano.");
                return _return;
            }

            if (<Boolean>(tmp_val.getValor()))
            {
                let entorno_actual: Map<String, Simbolo> = new Map<String, Simbolo>();
                Tabla_Simbolos.getInstance().getStack().push(entorno_actual);

                var val_sentencia: Simbolo;

                for(var x = 0; x <  this.lista_sentencias_if.length; x++)
                {                    
                    val_sentencia = this.lista_sentencias_if[x].ejecutar(entorno_actual,salida);

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
                        continue;             
                    }
                }

                _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.BOOLEANO), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor(true);

                Tabla_Simbolos.getInstance().getStack().pop();
                return _return;                
            }
            else //sentencias else if y else
            {                                                
                var val_sentencia : Simbolo;
                
                for(var x= 0; x < this.lista_else_if.length; x++)
                {                    
                    val_sentencia = this.lista_else_if[x].ejecutar(entorno_padre,salida);

                    if(val_sentencia.getRol() == tipo_rol.error)
                    {                        
                        _return = val_sentencia;
                        return _return;
                    }
                    else if(val_sentencia.getRol() == tipo_rol.detener)
                    {                        
                        _return = val_sentencia;
                        return _return;
                    }
                    else if(val_sentencia.getRol() == tipo_rol.continuar) //CONTINUE
                    {
                        _return = val_sentencia;
                        return _return;
                    }
                    else if(val_sentencia.getRol() == tipo_rol.retornar) //RETURN
                    {
                        _return = val_sentencia;
                        return _return;
                    }
                    else if(_return.getRol() == tipo_rol.aceptado)
                    {                        
                        if(_return.getTipo().getTipo() == tipo_dato.BOOLEANO)
                        {
                            if(<Boolean>_return.getValor())
                            {
                                return _return;
                            }
                            else
                            {
                                _return = val_sentencia;
                            }
                        }
                        else
                        {
                            _return = val_sentencia;
                        }
                    }
                    else
                    {
                        _return = val_sentencia;
                    }
                }                                
                
                var entorno_actual : Map<String, Simbolo> = new HashMap<String, Simbolo>();
                Tabla_Simbolos.getInstance().getStack().add(entorno_actual);

                Simbolo val_sentencia_else;

                for(int x = 0; x < lista_sentencias_else.size(); x++)
                {
                    val_sentencia_else = lista_sentencias_else.get(x).ejecutar(entorno_actual,salida);
                    if(val_sentencia_else.getTipo().Equals(new Tipo(Tabla_Enums.tipo_primitivo_Simbolo.detener)) && val_sentencia_else.getIdentificador().equals("33-12")) //ERROR
                    {
                        Tabla_Simbolos.getInstance().getStack().pop();
                        _return = val_sentencia_else;
                        return _return;
                    }
                    else if (val_sentencia_else.getTipo().Equals(new Tipo(Tabla_Enums.tipo_primitivo_Simbolo.detener)) && val_sentencia_else.getIdentificador().equals("10-4")) //BREAK
                    {
                        Tabla_Simbolos.getInstance().getStack().pop();
                        _return = val_sentencia_else;
                        return _return;
                    }
                    else if (val_sentencia_else.getTipo().Equals(new Tipo(Tabla_Enums.tipo_primitivo_Simbolo.continuar)) && val_sentencia_else.getIdentificador().equals("10-4")) //CONTINUE
                    {
                        Tabla_Simbolos.getInstance().getStack().pop();
                        _return = val_sentencia_else;
                        return _return;
                    }
                    else if (val_sentencia_else.getTipo().Equals(new Tipo(Tabla_Enums.tipo_primitivo_Simbolo.retornar)) && !val_sentencia_else.getIdentificador().equals("33-12")) //RETURN
                    {
                        Tabla_Simbolos.getInstance().getStack().pop();
                        _return = val_sentencia_else;
                        return _return;
                    }
                    else
                    {                        
                        _return = new Simbolo(new Tipo(Tabla_Enums.tipo_primitivo_Simbolo.nulo),"10-4");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setFirstValor("Sentencia ELSE verdadera");                                            
                    }
                }       
                
                Tabla_Simbolos.getInstance().getStack().pop();
            
                _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Sentencia If Ejecutada correctamente");  
                return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error Sentencia If: " + Exception.Message);
            return _return;
        }
    }

    public getThis() 
    {
        var clon_lista_sentencias_if: Array<Instruction> = new Array<Instruction>();
        var clon_lista_else_if: Array<Instruction> = new Array<Instruction>();
        var clon_lista_sentencias_else: Array<Instruction> = new Array<Instruction>();
        
        for(var x = 0; x < this.lista_sentencias_if.length; x++)
        {
            clon_lista_sentencias_if.push(this.lista_sentencias_if[x].getThis());
        }
    
        for(var y = 0; y < this.lista_else_if.length; y++)
        {
            clon_lista_else_if.push(this.lista_else_if[y].getThis());
        }
        
        for(var z = 0; z < this.lista_sentencias_else.length; z++)
        {
            clon_lista_sentencias_else.push(this.lista_sentencias_else[z].getThis());
        }
        
        return new Sentencia_If(this.fila,this.columna,this.sentencia_comparacion.getThis(),clon_lista_sentencias_if,clon_lista_else_if,clon_lista_sentencias_else);
    }
}