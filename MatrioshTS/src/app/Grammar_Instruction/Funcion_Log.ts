import Funcion from "./Funcion";
import Instruction from './Instruction';

class Funcion_Log extends Funcion
{
    
    constructor(p_fila : number, p_columna : number, p_id : String, p_lista_parametros? : Array<Instruction>)
    {
        super(p_fila, p_columna, "log", p_lista_parametros, undefined);
    }
    
    public Simbolo ejecutar(HashMap<String, Simbolo> entorno_local, Input salida) 
    {
        Simbolo _return = null;
        Simbolo tmp_val = null;
        try
        {
            if(valor == null)
            {
                _return = new Simbolo(new Tipo(Tabla_Enums.tipo_primitivo_Simbolo.detener),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setFirstValor("Declaracion: valor vacio");
                return _return;
            }
            else
            {
                tmp_val = valor.ejecutar(entorno_local, salida);
            }
                                                  
            if(tmp_val.getTipo().Equals(new Tipo(Tabla_Enums.tipo_primitivo_Simbolo.detener)))                
            {
                return tmp_val;
            }
            
            if(tmp_val.getRol()== Tabla_Enums.tipo_Simbolo.vector && tmp_val.getValor().size() == 1)
            {
                if(tmp_val.getFirstValor() instanceof Simbolo)
                {
                    salida.ConsolaAppend(((Simbolo)tmp_val.getFirstValor()).getFirstValor().toString());
                }
                else
                {
                    salida.ConsolaAppend(tmp_val.getFirstValor().toString());
                }
            }
            else if(tmp_val.getRol()== Tabla_Enums.tipo_Simbolo.vector && tmp_val.getValor().size() > 1)
            {                

                String contenido = "[";
                
                for(int x = 0; x < tmp_val.getValor().size(); x++)
                {
                    if(x >0)
                    {   
                        if(tmp_val.getValor().get(x) instanceof Simbolo)
                        {
                            contenido = contenido + "," + ((Simbolo)tmp_val.getValor().get(x)).getFirstValor().toString();
                        }
                        else
                        {
                            contenido = contenido + "," + tmp_val.getValor().get(x).toString();
                        }
                    }
                    else
                    {
                        if(tmp_val.getValor().get(x) instanceof Simbolo)
                        {
                            contenido = contenido + ((Simbolo)tmp_val.getValor().get(x)).getFirstValor().toString();
                        }
                        else
                        {
                            contenido = contenido +  tmp_val.getValor().get(x).toString();
                        }
                    }
                }
                
                contenido = contenido + "]";                                    
                
                salida.ConsolaAppend(contenido);                
            }
            else if(tmp_val.getRol()== Tabla_Enums.tipo_Simbolo.lista && tmp_val.getValor().size() == 1)
            {
                salida.ConsolaAppend(tmp_val.getFirstValor().toString());
            }
            else if(tmp_val.getRol()== Tabla_Enums.tipo_Simbolo.lista && tmp_val.getValor().size() > 1)
            {
                String contenido = "[";
                
                for(int x = 0; x < tmp_val.getValor().size(); x++)
                {
                    if(x >0)
                    {
                        if(((Simbolo)tmp_val.getValor().get(x)).getValor().size() > 1)
                        {
                            contenido = contenido + "," + printlist((Simbolo)tmp_val.getValor().get(x));
                        }
                        else
                        {
                            contenido = contenido + "," + ((Simbolo)tmp_val.getValor().get(x)).getFirstValor().toString();
                        }                        
                    }
                    else
                    {
                        if(((Simbolo)tmp_val.getValor().get(x)).getValor().size() > 1)
                        {
                            contenido = contenido + printlist((Simbolo)tmp_val.getValor().get(x));
                        }
                        else
                        {
                            contenido = contenido + ((Simbolo)tmp_val.getValor().get(x)).getFirstValor().toString();
                        }
                    }
                }
                
                contenido = contenido + "]";                                    
                
                salida.ConsolaAppend(contenido);                   
            }
            else if(tmp_val.getRol()== Tabla_Enums.tipo_Simbolo.matriz)
            {
                String cadena_contenido = "";
                String cadena_encabezado = "     ";
                String cadena_fila = "";
                String cadena_columna = "";                                
                
                for(int x = 0; x < tmp_val.getValor().size(); x++) //recorrido de la matriz
                {                    
                    cadena_encabezado = cadena_encabezado.concat("[," + (x+1) + "]    ");
                }
                
                Simbolo col_tmp = (Simbolo) tmp_val.getValor().get(0);
                int col_tam  =  tmp_val.getValor().size();
                int fila_tam =  col_tmp.getValor().size();                
                
                for(int x = 0; x < fila_tam; x++)
                {                                        
                    for(int y = 0; y < col_tam; y++)
                    {
                        Simbolo lista_col = (Simbolo) tmp_val.getValor().get(y);
                        
                        if(y >0)
                        {
                            cadena_fila = cadena_fila.concat("     " + ((Simbolo)lista_col.getValor().get(x)).getFirstValor().toString());
                        }
                        else
                        {
                            cadena_fila = cadena_fila.concat("[," + (x+1) + "]  ");
                            cadena_fila = cadena_fila.concat(((Simbolo)lista_col.getValor().get(x)).getFirstValor().toString());                            
                        }
                    }         
                    cadena_fila = cadena_fila.concat("\n");
                }
                    
                                                                    
                cadena_contenido = cadena_encabezado + "\n";
                cadena_contenido = cadena_contenido + cadena_fila;
                
                salida.ConsolaAppend(cadena_contenido);
            }
            else
            {
                salida.ConsolaAppend("Excepción: Tipo de dato no recnocido, fila: " + this.fila + " columna: " + this.columna);
            }
            
            _return = new Simbolo(new Tipo(Tabla_Enums.tipo_primitivo_Simbolo.nulo),"10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setFirstValor("Imprimir: Sentencia realizada correctamente.");
            return _return;
            
        }
        catch(Exception e)
        {
            _return = new Simbolo(new Tipo(Tabla_Enums.tipo_primitivo_Simbolo.detener,"error"), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setFirstValor("Error en Sentencia Imprimir: " + e.getMessage());
            return _return;
        }
    }    
    
    private String printlist(Simbolo sim_list)
    {
        String lista_tmp = "[";
        
        for(int x = 0; x < sim_list.getValor().size(); x++)
        {
            if( x > 0)                
            {
                if(((Simbolo)sim_list.getValor().get(x)).getValor().size() > 1)
                {
                    lista_tmp = lista_tmp.concat("," + printlist((Simbolo)sim_list.getValor().get(x)));
                }
                else
                {
                    lista_tmp = lista_tmp.concat("," + ((Simbolo)sim_list.getValor().get(x)).getFirstValor().toString());
                }
            }
            else
            {
                if(((Simbolo)sim_list.getValor().get(x)).getValor().size() > 1)
                { 
                    lista_tmp = lista_tmp.concat(printlist((Simbolo)sim_list.getValor().get(x)));    
                }    
                else
                {
                    lista_tmp = lista_tmp.concat(((Simbolo)sim_list.getValor().get(x)).getFirstValor().toString());
                }
            }            
        }
        
        lista_tmp = lista_tmp.concat("]");
        
        return lista_tmp;        
    }

    public getThis() 
    {
        var clon_lista_parametros : Array<Instruction>  = new Array<Instruction>();
        
        for(var x = 0; x < this.lista_parametros.length; x++)
        {
            clon_lista_parametros.push(this.lista_parametros[x].getThis());
        }

        return new Funcion_Log(this.fila,this.columna,"log",clon_lista_parametros);
    }
    
}

export default Funcion_Log;