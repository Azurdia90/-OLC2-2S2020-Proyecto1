import Instruction from "./Instruction";
import Middle from './Middle';
import Simbolo from './Simbolo';
import Tabla_Simbolos from './Tabla_Simbolos';
import Tipo from './Tipo';

class Sentencia_For_List extends Instruction
{
    private tipo: number;
    private iterator: String;
    private lista: String;
    private lista_sentencias: Array<Instruction>;
    
    constructor(p_linea: number, p_columna : number, p_tipo: number, p_iterator : String, p_lista: String, p_lista_sentencias : Array<Instruction>)
    {
        super(p_linea,p_columna);

        this.tipo = p_tipo;
        this.iterator = p_iterator;
        this.lista = p_lista;     
        this.lista_sentencias = p_lista_sentencias;
    }

    public ejecutar(entorno_padre : Map<String, Simbolo> , salida : Middle)
    {
        let _return : Simbolo;
        let tmp_val1 : Simbolo;
        let tmp_val2 : Simbolo;
 
        try
        {
            let entorno_for: Map<String, Simbolo> = new Map<String, Simbolo>();
            Tabla_Simbolos.getInstance().getStack()._push(this.fila,this.columna,entorno_for);

            tmp_val1 = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.NULO), this.iterator);
            tmp_val1.setValor("null");
            
            entorno_for.set(this.iterator,tmp_val1);

            if(entorno_padre.has(this.lista))
            {
                tmp_val2 = entorno_padre.get(this.lista);
            }
            else
            {
                tmp_val2 =  Tabla_Simbolos.getInstance().getStack().getSimbolo(this.lista);
            }
            
            if (tmp_val2 == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Sentencia For In/For: No existe lista a iterar.");
                return _return;
            }

            if(tmp_val2.getRol() != tipo_rol.arreglo && tmp_val2.getRol() != tipo_rol.type)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Sentencia For In/For: Es para listas y types únicamente.");
                return _return;
            }
            
            if(this.tipo == 0)
            {
                if(tmp_val2.getRol() == tipo_rol.arreglo)
                {
                    let lista_tmp = <Array<Simbolo>> tmp_val2.getValor();
                    for(let key in lista_tmp)
                    {   
                        tmp_val1 = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO),this.iterator);
                        tmp_val1.setValor(key);
                        entorno_for.set(this.iterator,tmp_val1); console.log(entorno_for);

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
                            Tabla_Simbolos.getInstance().getStack().pop();
                            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setValor("Sentencia For In/Of Ejecutada correctamente");  
                            return _return;
                        }  
                    }
                }
                else
                {
                    let map_tmp = <Map<String,Simbolo>> tmp_val2.getValor();

                    for(let key in map_tmp)
                    {
                        tmp_val1 = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA),this.iterator);
                        tmp_val1.setValor(key);
                        entorno_for.set(this.iterator,tmp_val1);

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
                            Tabla_Simbolos.getInstance().getStack().pop();
                            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setValor("Sentencia For In/Of Ejecutada correctamente");  
                            return _return;
                        }  
                    }
                }
            }
            else if(this.tipo == 1)
            {
                if(tmp_val2.getRol() == tipo_rol.arreglo)
                {
                    let lista_tmp = <Array<Simbolo>> tmp_val2.getValor();
                    for(let value of lista_tmp)
                    {
                        tmp_val1 = value;
                        entorno_for.set(this.iterator,tmp_val1);

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
                            Tabla_Simbolos.getInstance().getStack().pop();
                            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setValor("Sentencia For In/Of Ejecutada correctamente");  
                            return _return;
                        }  
                    }
                }
                else
                {
                    let map_tmp = <Map<String,Simbolo>> tmp_val2.getValor();

                    for(let [key,value] of map_tmp)
                    {
                        tmp_val1 = value;
                        entorno_for.set(this.iterator,tmp_val1);

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
                            Tabla_Simbolos.getInstance().getStack().pop();
                            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setValor("Sentencia For In/Of Ejecutada correctamente");  
                            return _return;
                        }  
                    }
                }
            }
            else
            {
                Tabla_Simbolos.getInstance().getStack().pop();

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("No es posible realizar Sentencia For In/Of: expresión no válida.");
                return _return;
            }
            
             
            Tabla_Simbolos.getInstance().getStack().pop();
                       
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Sentencia For In/Of Ejecutada correctamente");  
            return _return;

        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error Sentencia For In/Of: " + Exception.Message);
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
        
        return new Sentencia_For_List(this.fila,this.columna,this.tipo,this.iterator,this.lista,clon_lista_sentencias);
    }
}

export default Sentencia_For_List;