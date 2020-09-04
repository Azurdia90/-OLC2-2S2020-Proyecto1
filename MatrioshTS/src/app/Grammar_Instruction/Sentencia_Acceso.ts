import { NumericValueAccessor } from '@ionic/angular';
import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Tipo_Acceso from './Tipo_Acceso';

class Sentencia_Acceso extends Instruction
{
    protected identificadores : String[];

    protected identificador : String;
    protected lista_accesos : Array<Tipo_Acceso>;
    protected lista_valores : Number;


    constructor(p_fila: number, p_columna: number, p_id : String, p_lista_accesos? : Array<Tipo_Acceso>)
    {
        super(p_fila,p_columna);

        this.identificador = p_id;
        this.lista_accesos = p_lista_accesos;
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle) 
    {
        let _return : Simbolo;
        let acceso : Simbolo;
        let lista_valores : Array<Number>;
        
        try
        {  
            if(entorno_padre.has(this.identificador))
            {
                acceso = entorno_padre.get(this.identificador);
            }
            else
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("La variable: \"" + this.identificador + "\" NO se encuentra en el entorno local.");
                return _return;
            }

            if(this.lista_accesos.length == 0)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Operador Acceso: No existen accesos definidos.");
                return _return;
            }
            else
            {
                lista_valores = new Array<Number>();
            }

            for(var cont = 0; cont < this.lista_accesos.length; cont++)
            {
                if(acceso.getRol() == tipo_rol.valor)
                {
    
                }
                else if(acceso.getRol() == tipo_rol.arreglo)
                {
    
                }
                else if(acceso.getRol() == tipo_rol.type)
                {
                    
                }
                else
                {
    
                }
            }


        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Sentencia Acceso: " + Exception.Message);
            return _return;
        }
    }

    public getThis() 
    {
        let lista_clon : Array<Tipo_Acceso> = new Array<Tipo_Acceso>();
        
        for(var x = 0; x < this.lista_accesos.length; x++)            
        {
            lista_clon.push(this.lista_accesos[x].getThis());
        }
                
        return new Sentencia_Acceso(this.fila,this.columna,this.identificador,lista_clon);
    }
}

export default Sentencia_Acceso;