import Instruction from "./Instruction";
import Middle from './Middle';
import Simbolo from './Simbolo';
import Tabla_Simbolos from './Tabla_Simbolos';
import Tipo from './Tipo';

class Sentencia_For extends Instruction
{
    private sentencia1: Instruction;
    private sentencia2: Instruction;
    private sentencia3: Instruction;
    private lista_sentencias: Array<Instruction>;
    
    constructor(p_linea: number, p_columna : number, p_sentencia1 : Instruction, p_sentencia2 : Instruction, p_sentencia3 : Instruction, p_lista_sentencias : Array<Instruction>)
    {
        super(p_linea,p_columna);

        this.sentencia1 = p_sentencia1;
        this.sentencia2 = p_sentencia2;
        this.sentencia3 = p_sentencia3;     
        this.lista_sentencias = p_lista_sentencias;
    }

    public ejecutar(entorno_padre : Map<String, Simbolo> , salida : Middle)
    {
        let _return : Simbolo;
        let tmp_val1 : Simbolo;
        let tmp_val2 : Simbolo;
        let tmp_val3 : Simbolo;

        try
        {
            let entorno_for: Map<String, Simbolo> = new Map<String, Simbolo>();
            Tabla_Simbolos.getInstance().getStack()._push(this.fila,this.columna,entorno_for);

            tmp_val1 =  (this.sentencia1 == null) ? null : this.sentencia1.ejecutar(entorno_for,salida);

            if (tmp_val1 == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Sentencia For: No pudo definirse el valor base del bucle.");
                return _return;
            }
            
            if(tmp_val1.getRol() != tipo_rol.aceptado)
            {
                return tmp_val1;
            }
            
            tmp_val2 =  (this.sentencia2 == null) ? null : this.sentencia2.ejecutar(entorno_for,salida);
            
            if (tmp_val2 == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Sentencia For: No existe una sentencia relacional.");
                return _return;
            }

            if(tmp_val2.getRol() != tipo_rol.valor)
            {
                return tmp_val2;
            }

            if(tmp_val2.getTipo().getTipo() != tipo_dato.BOOLEANO)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("No es posible realizar Sentencia For: expresión no da como resultado un valor booleano.");
                return _return;
            }
            
            while(<Boolean>(tmp_val2.getValor()))
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
                    _return.setValor("Sentencia For Ejecutada correctamente");  
                    return _return;
                }       
                
                tmp_val3 =  (this.sentencia3 == null) ? null : this.sentencia3.ejecutar(entorno_for,salida);

                if (tmp_val3 == null)
                {
                    Tabla_Simbolos.getInstance().getStack().pop();
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Sentencia For: No pudo definirse la sentencia de incremento o decremento.");
                    return _return;
                }
                
                if(tmp_val3.getRol() != tipo_rol.valor)
                {
                    Tabla_Simbolos.getInstance().getStack().pop();
                    return tmp_val3;
                }

                tmp_val2 = (this.sentencia2 == null) ? null : this.sentencia2.ejecutar(entorno_for,salida);            
            }        
            
            Tabla_Simbolos.getInstance().getStack().pop();
                       
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Sentencia For Ejecutada correctamente");  
            return _return;
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error Sentencia For: " + Exception.Message);
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
        
        return new Sentencia_For(this.fila,this.columna,this.sentencia1.getThis(),this.sentencia2.getThis(),this.sentencia3.getThis(),clon_lista_sentencias);
    }
}

export default Sentencia_For;