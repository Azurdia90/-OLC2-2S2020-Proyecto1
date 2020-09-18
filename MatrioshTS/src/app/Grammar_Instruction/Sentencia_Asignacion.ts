import Instruction from './Instruction';
import Tipo from './Tipo';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tabla_Simbolos from './Tabla_Simbolos';

class Sentencia_Asignacion extends Instruction
{
    protected tipo : Number;
    protected acceso0 : String;
    protected acceso1 : Instruction;
    protected valor :   Instruction;

    constructor(p_fila: number, p_columna: number, p_tipo : Number, p_acceso0? : String, p_acceso1? : Instruction, p_valor? : Instruction)
    {
        super(p_fila,p_columna);
        
        this.tipo = p_tipo;
        this.acceso0 = p_acceso0;
        this.acceso1 = p_acceso1;
        this.valor = p_valor;
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        let _acceso : Simbolo;
        let _val_fin : Simbolo;

        try
        {
            
            if(this.tipo == 0)
            {
                if(entorno_padre.has(this.acceso0))
                {                 
                    _acceso  = entorno_padre.get(this.acceso0);
                }
                else
                {   
                    _acceso = Tabla_Simbolos.getInstance().getStack().getSimbolo(this.acceso0);                    
                }   
            }
            else
            {
                _acceso = this.acceso1.ejecutar(entorno_padre, salida);
            }

            if(_acceso.getRol() != tipo_rol.valor && _acceso.getRol() != tipo_rol.arreglo)
            {
                return _acceso
            }

            _val_fin = this.valor.ejecutar(entorno_padre, salida);

            if(_val_fin.getRol() != tipo_rol.valor && _val_fin.getRol() != tipo_rol.arreglo)
            {
                return _val_fin;
            }

            if(_acceso.getTipo().getTipo() !=  _val_fin.getTipo().getTipo())
            {
                if(_val_fin.getTipo().getTipo() != tipo_dato.NULO)
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                    _return.setValor("El tipo de la variable es diferente al valor a asignar.");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    return _return;
                }
            } 

            _acceso.setTipo(_val_fin.getTipo());
            _acceso.setValor(_val_fin.getValor());
            
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4"); 
            _return.setValor("Asignación Succesful");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            return _return;
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Sentencia Asignación: " + Exception.Message);
            return _return;
        }
    }

    public getThis() 
    {   
        return new Sentencia_Asignacion(this.fila,this.columna,this.tipo,this.acceso0, this.acceso1 == undefined ? undefined : this.acceso1.getThis(), this.valor == undefined ? undefined : this.valor.getThis());
    }
}

export default Sentencia_Asignacion;