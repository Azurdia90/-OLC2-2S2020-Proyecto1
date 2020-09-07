import Funcion from "./Funcion";
import Instruction from './Instruction';
import Middle from './Middle';
import Simbolo from './Simbolo';
import Sentencia_Declaracion from './Sentencia_Declaracion';
import Tipo from './Tipo';
import Tabla_Simbolos from './Tabla_Simbolos';

class Funcion_Matriosh extends Funcion
{
    constructor(p_fila : number, p_columna : number, p_id : String, p_lista_parametros? : Array<Instruction>, p_lista_sentencias? : Array<Instruction>)
    {
        super(p_fila, p_columna, p_id, p_lista_parametros, p_lista_sentencias);
    }
    
    public pasarParametros(lista_parametros_enviados : Array<Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        
        this.entorno_local = new Map<String,Simbolo>();
        
        if(this.lista_parametros.length == lista_parametros_enviados.length)
        {
                    
            for(var x = 0; x < this.lista_parametros.length; x++)
            {
                var declaracion_actual : Sentencia_Declaracion = <Sentencia_Declaracion> this.lista_parametros[x];

                if(declaracion_actual.getValor() == null)
                {
                    declaracion_actual.setValor_Ext(lista_parametros_enviados[x]);
                }

                var _result : Simbolo = declaracion_actual.ejecutar(this.entorno_local, salida);

                if(_result.getRol() != tipo_rol.valor && _result.getRol() != tipo_rol.arreglo)
                {
                    this.entorno_local = new Map<String,Simbolo>();
                    return _result;
                }        
            }

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna); 
            _return.setValor("Paso de Parametros Succesful");
            return _return;
        }
        else
        {
            this.entorno_local = new Map<String,Simbolo>();

            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Cantidad de parametros enviados no coinciden con los de la función");   
            return _return;            
        }        
    }
    
    public ejecutar(entorno_padre : Map<String, Simbolo>, salida : Middle) 
    {
        let _return : Simbolo;

        try
        {
            var _tmp_return : Simbolo;
            
            Tabla_Simbolos.getInstance().getStack()._push(this.fila,this.columna,this.entorno_local);
            //consolo.log("Se entro a un metodo cantidad de ambitos: " + Tabla_Simbolos.getInstance().getStack().size());
            
            for(var x = 0; x < this.lista_sentencias.length; x++)            
            {
                _tmp_return = this.lista_sentencias[x].ejecutar(this.entorno_local, salida);
                
                if (_tmp_return.getRol() == tipo_rol.error)
                {
                    _return = _tmp_return;
                    Tabla_Simbolos.getInstance().getStack().pop();
                    this.entorno_local = new Map<String,Simbolo>();
                    return _return;                    
                }
                else if (_tmp_return.getRol() == tipo_rol.detener)
                {
                    Tabla_Simbolos.getInstance().getStack().pop();
                    this.entorno_local = new Map<String,Simbolo>();

                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Error en Funcion: No se permite el uso de sentencia break");
                    return _return;                    
                }
                else if(_tmp_return.getRol() == tipo_rol.continuar)
                {
                    Tabla_Simbolos.getInstance().getStack().pop();
                    this.entorno_local = new Map<String,Simbolo>();

                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Error en Funcion: No se permite el uso de sentencia continue");
                    return _return;   
                }
                else if(_tmp_return.getRol() == tipo_rol.retornar) 
                {                                                           
                    _return = <Simbolo> _tmp_return.getValor();                 
                    Tabla_Simbolos.getInstance().getStack().pop();
                    this.entorno_local = new Map<String,Simbolo>();
                    //console.log("Se retorno de un metodo cantidad de ambitos: " + Tabla_Simbolos.getInstance().getStack().size());
                    return _return;
                }
                else
                {      
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NULO), "");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("null");   
                    return _return;
                }                
            }
            
            Tabla_Simbolos.getInstance().getStack().pop();
            this.entorno_local = new Map<String,Simbolo>();
            
            _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NULO), "");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("null");   
            return _return;
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error Funcion " + this.identificador + " : " + Exception);
            return _return;        
        }
    } 

    public getThis()
    {
        var clon_lista_parametros : Array<Instruction>  = new Array<Instruction>();
        var clon_lista_sentencias : Array<Instruction>  = new Array<Instruction>();
        
        /*if(identificador.equalsIgnoreCase("agregarNotas"))
        {
            System.out.println("Ejecutando la función: " + identificador);
        }*/
        
        for(var x = 0; x < this.lista_parametros.length; x++)
        {
            clon_lista_parametros.push(this.lista_parametros[x].getThis());
        }
        
        for(var y = 0; y < this.lista_sentencias.length; y++)
        {
            clon_lista_sentencias.push(this.lista_sentencias[y].getThis());
        }
        
        return new Funcion_Matriosh(this.fila,this.columna,this.identificador,clon_lista_parametros,clon_lista_sentencias);
    }
}

export default Funcion_Matriosh;