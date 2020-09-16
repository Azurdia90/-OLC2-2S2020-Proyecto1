import Instruction from "./Instruction";
import Middle from './Middle';
import Sentencia_Caso from './Sentencia_Caso';
import Simbolo from './Simbolo';
import Tabla_Simbolos from './Tabla_Simbolos';
import Tipo from './Tipo';

class Sentencia_Switch extends Instruction
{
    private valor_condicion: Instruction;
    private lista_casos: Array<Instruction>;
    
    constructor(p_linea: number, p_columna : number , p_valor_condicion : Instruction, p_lista_casos : Array<Instruction>)
    {
        super(p_linea,p_columna);

        this.valor_condicion = p_valor_condicion;        
        this.lista_casos = p_lista_casos;
    }

    public ejecutar(entorno_padre : Map<String, Simbolo> , salida : Middle)
    {
        let _return : Simbolo;
        let tmp_val : Simbolo;
        console.log(Tabla_Simbolos.getInstance().getStack());
        try
        {
            tmp_val = (this.valor_condicion == null) ? null : this.valor_condicion.ejecutar(entorno_padre,salida);

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

            if(tmp_val.getTipo().getTipo() == tipo_dato.IDENTIFICADOR)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("No es posible realizar Sentencia Switch con un valor no Primitivo.");
                return _return;
            }

            var tmp_caso: Sentencia_Caso;
            var val_caso: Simbolo;
            console.log(tmp_val);
            for(var x = 0; x <  this.lista_casos.length; x++)
            {           
                tmp_caso = <Sentencia_Caso> this.lista_casos[x]; 
                tmp_caso.setValorPadre(tmp_val);        
                val_caso = tmp_caso.ejecutar(entorno_padre,salida);

                if (val_caso.getRol() == tipo_rol.error)
                {                        
                    _return = val_caso;
                    return _return;
                }
                else if (val_caso.getRol() == tipo_rol.detener)
                {     
                    _return = val_caso;                    
                    break;
                }
                else if (val_caso.getRol() == tipo_rol.continuar)
                {   
                    _return = val_caso;                     
                    continue;
                }
                else if (val_caso.getRol() == tipo_rol.retornar)
                {
                    _return = val_caso;                      
                    return _return;
                }
                else
                {     
                    _return = val_caso;
                    continue;
                }       
            }               
      
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Sentencia Swtich Ejecutada correctamente");  
            return _return;
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
        var clon_lista_casos: Array<Instruction> = new Array<Instruction>();
        
        for(var x = 0; x < this.lista_casos.length; x++)
        {
            clon_lista_casos.push(this.lista_casos[x].getThis());
        }
        
        return new Sentencia_Switch(this.fila,this.columna,this.valor_condicion.getThis(),clon_lista_casos);
    }
}

export default Sentencia_Switch;