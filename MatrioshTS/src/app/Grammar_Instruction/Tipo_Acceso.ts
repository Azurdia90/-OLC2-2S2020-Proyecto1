import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Tipo_Acceso extends Instruction
{
    private tipo : number;
    
    private expresion1 : Instruction;
    private expresion2 : Instruction;
    private expresion3 : String;
    
    private result1 : Simbolo;
    private result2 : Simbolo;
        
    public constructor(p_fila : number, p_columna: number, p_tipo : number, expresion1? : Instruction, expresion2? : Instruction, expresion3? : String)
    {
        super(p_fila,p_columna);

        this.tipo = p_tipo;
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
        this.expresion3 = expresion3;
    }
    
    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle) 
    {
        let _return : Simbolo;
        
        try
        {
            if(this.tipo == 0)
            {
                return this.expresion1.ejecutar(entorno_padre, salida);
            }
            else if(this.tipo == 1)
            {
                return this.expresion2.ejecutar(entorno_padre, salida);
            }
            else if(this.tipo == 2)
            {
                return this.expresion2.ejecutar(entorno_padre, salida);
            }      
            else
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Error Valor Acceso: Tipo de Acceso no definido ");
            }

            return _return;
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Tipo Acceso: " + Exception.Message);
            return _return;        
        }        
    }

    public getTipo() 
    {
        return this.tipo;
    }

    public getThis() 
    {
        return new Tipo_Acceso(this.fila, this.columna, this.tipo, this.expresion1 == undefined ? null : this.expresion1.getThis(), this.expresion2 == undefined ? null : this.expresion2.getThis(), this.expresion3 == undefined ? undefined : this.expresion3);
    }

}

export default Tipo_Acceso;