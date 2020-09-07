import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Funcion from './Funcion';
import Sentencia_Llamada from './Sentencia_Llamada';

class Tipo_Acceso extends Instruction
{
    private tipo : number;
    
    private expresion1 : Instruction;
    private expresion2 : Instruction;
    private expresion3 : String;
    
    private padre : Simbolo;
        
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
                if(this.padre.getRol() == tipo_rol.arreglo)
                {
                    var pos : Simbolo;
                    pos = this.expresion1.ejecutar(entorno_padre, salida);

                    if(pos.getRol() == tipo_rol.valor && pos.getTipo().getTipo() == tipo_dato.NUMERO)
                    {
                        var pos_rel : Number;
                        pos_rel = Number(pos.getValor());
                        if(pos_rel < 0)
                        {
                            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setValor("Error Operador Acceso: La posición del arreglo debe ser mayor o igual a 0.");
                            return _return;

                        }
                        else if(pos_rel >= 0)
                        {
                            if((<Array<Simbolo>>this.padre.getValor()).length > pos_rel)
                            {
                                return (<Array<Simbolo>>this.padre.getValor())[pos_rel.valueOf()];
                            }
                            else
                            {
                                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                                _return.setFila(this.fila);
                                _return.setColumna(this.columna);
                                _return.setValor("Error Operador Acceso: La posición del arreglo es mayor al tamaño del arreglo.");
                                return _return;
                            }
                        }
                    }
                    else
                    {
                        _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setValor("Error Operador Acceso: La posición del arreglo debe ser un valor númerico.");
                        return _return;
                    }
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Error Operador Acceso: Este tipo de acceso es válido unicamente para arreglos.");
                    return _return;
                }
            }
            else if(this.tipo == 1)
            {
                if(this.padre.getRol() == tipo_rol.type)
                {
                    var type_rel : Map<String,Simbolo>;

                    type_rel = <Map<String,Simbolo>>this.padre.getValor();

                    if(type_rel.has(this.expresion3))
                    {
                        return type_rel.get(this.expresion3);
                    }
                    else
                    {
                        _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setValor("Error Operador Acceso: Este atributo no existe aún.");
                        return _return;
                    }
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Error Operador Acceso: Este tipo de acceso es válido unicamente para Types.");
                    return _return;
                }
            }
            else if(this.tipo == 2)
            {
                if(this.padre.getRol() == tipo_rol.type)
                {
                    (<Sentencia_Llamada> this.expresion2).setGlobal(false);

                    (<Sentencia_Llamada> this.expresion2).setPadre(this.padre);
                    
                    _return = this.expresion2.ejecutar(entorno_padre, salida);

                    return _return;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setValor("Error Operador Acceso: Este tipo de acceso es válido unicamente para Types.");
                    return _return;
                }
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

    public getPadre()
    {
        return this.padre
    }

    public setPadre(padre : Simbolo)
    {
        this.padre = padre;
    }

    public getThis() 
    {
        return new Tipo_Acceso(this.fila, this.columna, this.tipo, this.expresion1 == undefined ? null : this.expresion1.getThis(), this.expresion2 == undefined ? null : this.expresion2.getThis(), this.expresion3 == undefined ? undefined : this.expresion3);
    }

}

export default Tipo_Acceso;