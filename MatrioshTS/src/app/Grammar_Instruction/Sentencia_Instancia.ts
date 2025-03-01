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
    protected lista_identificadores : Array<String>;
    protected lista_valores1 : Array<Instruction>;
    protected lista_valores2 : Array<Instruction>;

    constructor(p_fila: number, p_columna: number, p_tipo : number, p_lista_identificadores?: Array<String>, p_lista_valores1?: Array<Instruction>, p_lista_valores2?: Array<Instruction>)
    {
        super(p_fila,p_columna);
        this.tipo = p_tipo;
        this.lista_identificadores = p_lista_identificadores;
        this.lista_valores1 = p_lista_valores1;
        this.lista_valores2 = p_lista_valores2;
    }

    public ejecutar(entorno_padre : Map<String,Simbolo>, salida : Middle) 
    {
        let _return : Simbolo;
        
        try
        {   //console.log(this.tipo);
            if(this.tipo == 0)
            {
                if(this.lista_valores1.length == 0)
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
                    
                    for(var x = 0; x < this.lista_valores1.length; x++)
                    {
                        var val_tmp : Simbolo
                        val_tmp = this.lista_valores1[x].ejecutar(entorno_padre,salida);

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
            else if(this.tipo == 1)
            {
                let type_tmp: Map<String,Simbolo>;

                type_tmp = new Map<String,Simbolo>();
                //console.log(this.lista_identificadores); console.log(this.lista_valores2);
                for(var t = 0; t < this.lista_identificadores.length; t++)
                {
                    let simbolo_tmp: Simbolo;
                    let valor_tmp: Simbolo;

                    valor_tmp = this.lista_valores2[t].ejecutar(entorno_padre, salida);

                    if(valor_tmp.getRol() != tipo_rol.valor && valor_tmp.getRol() != tipo_rol.arreglo && valor_tmp.getRol() != tipo_rol.type)
                    {
                        return valor_tmp;
                    }

                    simbolo_tmp = new Simbolo(valor_tmp.getRol(),valor_tmp.getTipo(),this.lista_identificadores[t]);
                    simbolo_tmp.setValor(valor_tmp.getValor());
                    simbolo_tmp.setListaDimensiones(valor_tmp.getListaDimensiones());
                    simbolo_tmp.setListaFunciones(valor_tmp.getListaFunciones());
                    
                    type_tmp.set(this.lista_identificadores[t],simbolo_tmp);
                }

                _return = new Simbolo(tipo_rol.type, new Tipo(tipo_dato.IDENTIFICADOR,""),"");
                _return.setValor(type_tmp);
               
                return _return;
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
        var clon_lista_identificadores: Array<String>;
        var clon_lista_valores1: Array<Instruction>;
        var clon_lista_valores2: Array<Instruction>;

        clon_lista_identificadores = new Array<String>();
        clon_lista_valores1 = new Array<Instruction>();
        clon_lista_valores2 = new Array<Instruction>();
        
        for(var x = 0; x < this.lista_identificadores.length; x++)            
        {
            clon_lista_identificadores.push(this.lista_identificadores[x].toString());
        }

        for(var y = 0; y < this.lista_valores1.length; y++)            
        {
            clon_lista_valores1.push(this.lista_valores1[y].getThis());
        }

        for(var z = 0; z < this.lista_valores2.length; z++)            
        {
            clon_lista_valores2.push(this.lista_valores2[z].getThis());
        }
                
        return new Sentencia_Instancia(this.fila,this.columna,this.tipo,clon_lista_identificadores,clon_lista_valores1,clon_lista_valores2);
    }
}

export default Sentencia_Instancia;