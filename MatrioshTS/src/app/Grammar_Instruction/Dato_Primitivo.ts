import Expresion from './Expresion';
import Tipo from './Tipo';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tabla_Simbolos from './Tabla_Simbolos';
import Instruction from './Instruction';

class Dato_Primitivo extends Expresion
{
    private dimensiones: Array<Instruction>;

    constructor(p_fila : number, p_columna : number, p_tipo : Tipo, p_valor : String, p_dimensiones: Array<Instruction>) {
        super(p_fila, p_columna, tipo_operacion.VALOR, undefined, undefined, p_tipo, p_valor);
        this.dimensiones = p_dimensiones;
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        let posicion: number
        try
        {   posicion = 0;
            if(this.tipo.getTipo() == tipo_dato.NULO && this.dimensiones.length == 0)
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NULO),"");
                _return.setValor("null");
                return _return;
            }
            else if(this.tipo.getTipo() == tipo_dato.BOOLEANO && this.dimensiones.length == 0)
            {
                if(this.valor == "true")
                {
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");
                    _return.setValor(true);
                    return _return;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");
                    _return.setValor(false);
                    return _return;
                }
            }
            else if(this.tipo.getTipo() == tipo_dato.NUMERO && this.dimensiones.length == 0)
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO),"");
                _return.setValor(Number(this.valor));
                return _return;
            }
            else if(this.tipo.getTipo() == tipo_dato.CADENA && this.dimensiones.length == 0)
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA),"");
                _return.setValor(this.valor.substring(1,this.valor.length - 1));
                return _return;
            }                
            else if(this.tipo.getTipo() == tipo_dato.IDENTIFICADOR && this.dimensiones.length == 0)
            {   
                if(entorno_padre.has(this.valor))
                {                 
                    _return = entorno_padre.get(this.valor);
                }
                else
                {   
                    _return = Tabla_Simbolos.getInstance().getStack().getSimbolo(this.valor);                    
                }   
                return _return; 
                /*if(_return.getRol() != tipo_rol.arreglo)
                {
                    return _return;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("No se especificaron la dimension(es) de acceso.");
                    return _return;
                } */  
            }
            else if(this.tipo.getTipo() == tipo_dato.IDENTIFICADOR && this.dimensiones.length > 0)
            {   
                var simbolo_tmp : Simbolo;
                posicion = 2;
                if(entorno_padre.has(this.valor))
                {                 
                    simbolo_tmp = entorno_padre.get(this.valor);
                }
                else
                {   
                    simbolo_tmp = Tabla_Simbolos.getInstance().getStack().getSimbolo(this.valor);                    
                }   
                
                if(simbolo_tmp.getRol() == tipo_rol.arreglo)
                {
                    var lista_accesos : Array<Number>;
                    var arreglo_tmp   : Array<Simbolo>;
                    var lista_tamaños : Array<Number>;

                    lista_accesos = new Array<Number>();
                    
                    for(var x = 0; x < this.dimensiones.length; x++)
                    {
                        var val_tmp: Simbolo;
                        val_tmp = this.dimensiones[x].ejecutar(entorno_padre,salida);
                        
                        if(val_tmp.getRol() == tipo_rol.valor && val_tmp.getTipo().getTipo() == tipo_dato.NUMERO)
                        {
                            lista_accesos.push(Number(val_tmp.getValor()));
                        }
                        else if(val_tmp.getRol() == tipo_rol.error && val_tmp.getTipo().getTipo() == tipo_dato.CADENA)
                        {
                            return val_tmp;
                        }
                        else
                        {
                            _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setValor("El valor de acceso debe ser tipo númerico.");
                            return _return;
                        }
                    }
                    
                    arreglo_tmp = <Array<Simbolo>> simbolo_tmp.getValor();
                    lista_tamaños = <Array<Number>> simbolo_tmp.getListaDimensiones();
                    
                    if(arreglo_tmp.length > 0 && lista_tamaños.length > 0)
                    {   
                        var pos_rel : Number;
                        pos_rel = 0;

                        if(lista_tamaños.length == lista_accesos.length)
                        {
                            pos_rel =  lista_accesos[0].valueOf();

                            for(var y: number = 1; y < lista_accesos.length; y++)
                            {
                                pos_rel = (pos_rel.valueOf() * lista_tamaños[y].valueOf()) + lista_accesos[y].valueOf();
                            }

                            if(pos_rel < 0)
                            {
                                _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                                _return.setFila(this.fila);
                                _return.setColumna(this.columna);
                                _return.setValor("Los valores de acceso no deben ser valores negativos.");
                            }
                            else
                            {
                                if(pos_rel < arreglo_tmp.length)
                                {
                                    _return = arreglo_tmp[pos_rel.valueOf()];
                                    return _return;
                                }
                                else
                                {
                                    _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                                    _return.setFila(this.fila);
                                    _return.setColumna(this.columna);
                                    _return.setValor("El valor de las posiciones de acceso es mayor al tamaño del arreglo.");
                                }
                            }
                        }
                        else
                        {
                            _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setValor("El cantidad de accesos no coincide con las dimensiones del arreglo.");
                        }
                    }
                    else
                    {   
                        _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setValor("El arreglo no a sido instanciado.");
                    }
                    
                    return _return;
                }
                else if(simbolo_tmp.getRol() == tipo_rol.error)
                {
                    _return = simbolo_tmp;
                    return _return;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Se especificaron dimension(es) de acceso para un No arreglo.");
                    return _return;
                } 
            }                               
            else
            {
                _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("No pudo ser reconocido el tipo de dato");
                return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error generación de valor Primitivo: " + posicion + " " + Exception.Message);
            return _return;
        }
    }  
    
    public getThis() 
    {
        var clon_dimensiones : Array<Instruction>;
        clon_dimensiones = new Array<Instruction>();
        
        for(var d =0; d < this.dimensiones.length; d++)
        {   
            clon_dimensiones.push(this.dimensiones[d].getThis());
        }

        return new Dato_Primitivo(this.fila, this.columna, this.tipo, this.valor,clon_dimensiones);
    }

}
export default Dato_Primitivo;