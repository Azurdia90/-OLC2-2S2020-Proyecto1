import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Funcion_Length from './Funcion_Length';
import Funcion_Push from './Funcion_Push';
import Funcion_Pop from './Funcion_Pop';

class Sentencia_Instancia extends Instruction
{
    protected tipo : number;
    protected lista_valores : Array<Instruction>;
    

    constructor(p_fila: number, p_columna: number, p_tipo : number, p_lista_valores?: Array<Instruction>)
    {
        super(p_fila,p_columna);
        this.tipo = p_tipo;
        this.lista_valores = p_lista_valores;
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle) 
    {
        let _return : Simbolo;
        
        try
        {  
            if(this.tipo == 0)
            {
                if(this.lista_valores.length == 0)
                {
                    var arreglo_val = new Array<Simbolo>();
                    var dimensiones_val = new Array<Number>();
                    
                    dimensiones_val.push(0);
                    
                    _return = new Simbolo(tipo_rol.arreglo, new Tipo(tipo_dato.NULO), "");
                    _return.setValor(arreglo_val);
                    _return.setListaDimensiones(dimensiones_val);

                    _return.getListaFunciones().push(new Funcion_Length(this.fila,this.columna));
                    _return.getListaFunciones().push(new Funcion_Push(this.fila,this.columna));
                    _return.getListaFunciones().push(new Funcion_Pop(this.fila,this.columna));

                    return _return;
                }
                else
                {
                    var tipo_arreglo: Tipo;

                    var arreglo_val = new Array<Simbolo>();
                    var dimensiones_val = new Array<Number>();
                    
                    for(var x = 0; x < this.lista_valores.length; x++)
                    {
                        var val_tmp : Simbolo
                        val_tmp = this.lista_valores[x].ejecutar(entorno_padre,salida);

                        if(val_tmp.getRol() == tipo_rol.valor || val_tmp.getRol() == tipo_rol.arreglo || val_tmp.getRol() == tipo_rol.type)
                        {
                            arreglo_val.push(val_tmp);
                        }  
                        else
                        {
                            return val_tmp;
                        }
                    }

                    tipo_arreglo = arreglo_val[0].getTipo();

                    for(var x = 1; x < arreglo_val.length; x++)
                    {
                        if(!tipo_arreglo.Equals(arreglo_val[x].getTipo()))
                        {
                            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setValor("El contenido del arreglo no tiene valores de un solo tipo");
                            return _return;
                        }
                    }

                    dimensiones_val.push(arreglo_val.length);
                    
                    _return = new Simbolo(tipo_rol.arreglo, tipo_arreglo, "");
                    _return.setValor(arreglo_val);
                    _return.setListaDimensiones(dimensiones_val);

                    _return.getListaFunciones().push(new Funcion_Length(this.fila,this.columna));
                    _return.getListaFunciones().push(new Funcion_Push(this.fila,this.columna));
                    _return.getListaFunciones().push(new Funcion_Pop(this.fila,this.columna));
                    
                    return _return;
                }
            }
            else
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setValor("El valor a instanciar no esta definidio.");
                return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Sentencia Instancia: " + Exception.Message);
            return _return;
        }
    }

    public getThis() 
    {
        var lista_clon : Array<Instruction>;
        lista_clon = new Array<Instruction>();
        
        for(var x = 0; x < this.lista_valores.length; x++)            
        {
            lista_clon.push(this.lista_valores[x].getThis());
        }
                
        return new Sentencia_Instancia(this.fila,this.columna,this.tipo,lista_clon);
    }
}

export default Sentencia_Instancia;