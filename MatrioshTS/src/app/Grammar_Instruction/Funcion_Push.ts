import Funcion from './Funcion';
import Instruction from './Instruction';
import Middle from './Middle';
import Simbolo from './Simbolo';
import Tipo from './Tipo';

class Funcion_Push extends Funcion
{
    private padre : Simbolo;
    private valor_tmp : Simbolo;
    private () {
        
    }
    constructor(p_fila : number, p_columna : number)
    {
        super(p_fila, p_columna, "length", new Array<Instruction>(), undefined);
    }

    public pasarParametros(lista_parametros_enviados : Array<Simbolo>, salida : Middle, p_padre?: Simbolo)
    {
        let _return : Simbolo;
        
        if(lista_parametros_enviados.length == 0)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Función Push: valor vacio");
            return _return;
        }else if (lista_parametros_enviados.length > 1)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Función Push: se envió mas de un valor");
            return _return;
        }
        else
        {
            this.padre = p_padre;
            this.valor_tmp = lista_parametros_enviados[0];

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna); 
            _return.setValor("Paso de Parametros Succesful");
            return _return;
        }        
    }
    
    public ejecutar(entorno_local : Map<String, Simbolo>, salida : Middle) 
    {
        let _return : Simbolo;

        try
        {  
            //console.log(this.padre);
            
            if(this.padre.getRol()== tipo_rol.arreglo)
            {
                var arreglo_tmp: Array<Simbolo>;
                arreglo_tmp = <Array<Simbolo>> this.padre.getValor();

                arreglo_tmp.push(this.valor_tmp);

                _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Sentencia Push succesful.");
                return _return;
            }
            else
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("Sentencia Push aplica únicamente en arreglos.");
                return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error en Sentencia Push: " + Exception);
            return _return;
        }
    }  

    public getThis() 
    {
        return new Funcion_Push(this.fila,this.columna);
    }
    
}

export default Funcion_Push;