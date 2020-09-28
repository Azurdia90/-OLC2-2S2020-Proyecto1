import Funcion from "./Funcion";
import Instruction from './Instruction';
import Middle from './Middle';
import Simbolo from './Simbolo';
import Tipo from './Tipo';

class Funcion_Log extends Funcion
{
    private valores_imprimir : Array<Simbolo>;

    constructor(p_fila : number, p_columna : number)
    {
        super(p_fila, p_columna, "log", new Array<Instruction>(), undefined);
    }

    public pasarParametros(lista_parametros_enviados : Array<Simbolo>, salida : Middle, padre? : Simbolo)
    {
        let _return : Simbolo;
        
        if(lista_parametros_enviados.length > 0)
        {
            this.valores_imprimir = lista_parametros_enviados;

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna); 
            _return.setValor("Paso de Parametros Succesful");
            return _return;
        }
        else
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Función Log: valor vacio");
            return _return;            
        }      
    }
    
    public ejecutar(entorno_local : Map<String, Simbolo>, salida : Middle) 
    {
        let _return : Simbolo;

        try
        {  
            //console.log(this.valor_imprimir);
            var salida_tmp: String;

            salida_tmp = "";

            for(var i = 0; i < this.valores_imprimir.length; i++)
            {
                salida_tmp = salida_tmp.concat(this.print(this.valores_imprimir[i]).toString());
            }
            
            salida.setOuput(salida_tmp);
            
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Imprimir: Sentencia realizada correctamente.");
            return _return;
            
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setValor("Error en Sentencia Imprimir: " + Exception);
            return _return;
        }
    }    

    private print(valor_imprimir: Simbolo)
    {
        let salida : String;
        salida = "";

        if(valor_imprimir.getRol()== tipo_rol.valor)
        {
            salida = valor_imprimir.tostring();
        }
        else if(valor_imprimir.getRol()== tipo_rol.arreglo)
        {                
            var contenido : String = "[";
            
            for(var x = 0; x < (<Array<Simbolo>>valor_imprimir.getValor()).length; x++)
            {
                if(x >0)
                {   
                    if(valor_imprimir.getValor()[x].getRol() == tipo_rol.arreglo)
                    {
                        contenido = contenido.concat(",", this.printlist(valor_imprimir.getValor()[x]).toString());
                    }
                    else if(valor_imprimir.getValor()[x].getRol() == tipo_rol.type)
                    {
                        contenido = contenido.concat(",",valor_imprimir.getValor()[x].tostring());
                    }
                    else
                    {
                        contenido = contenido.concat(",",valor_imprimir.getValor()[x].tostring());
                    }
                }
                else
                {
                    if(valor_imprimir.getValor()[x].getRol() == tipo_rol.arreglo)
                    {
                        contenido = contenido.concat('', this.printlist(valor_imprimir.getValor()[x].toString()).toString());
                    }
                    else if(valor_imprimir.getValor()[x].getRol() == tipo_rol.type)
                    {
                        contenido = contenido.concat(valor_imprimir.getValor()[x].tostring());
                    }
                    else
                    {
                        contenido = contenido.concat(valor_imprimir.getValor()[x].tostring());
                    }
                }
            }
            
            contenido = contenido.concat("]");                                    
            
            salida = contenido;                
        }
        else if(valor_imprimir.getRol() == tipo_rol.type)
        {
            salida = valor_imprimir.tostring();
        }
        else
        {
            salida = "Excepción: Tipo de dato no recnocido, fila: " + this.fila + " columna: " + this.columna;
        }

        return salida;
    }
    
    private printlist(sim_list : Simbolo)
    {
        let lista_tmp : String = "[";
        
        for(var x = 0; x < (<Array<Simbolo>>sim_list.getValor()).length; x++)
        {
            if( x > 0)                
            {
                if((sim_list.getValor()[x]).getRol() == tipo_rol.arreglo)
                {
                    lista_tmp = lista_tmp.concat("," , this.printlist(sim_list.getValor()[x]).toString());
                }
                else if((sim_list.getValor()[x]).getRol() == tipo_rol.type)
                {
                    lista_tmp = lista_tmp.concat("," , (sim_list.getValor()[x]).tostring());
                }
                else
                {
                    lista_tmp = lista_tmp.concat("," ,(sim_list.getValor()[x]).tostring());
                }
            }
            else
            {
                if((sim_list.getValor()[x]).getRol() == tipo_rol.arreglo)
                { 
                    lista_tmp = lista_tmp.concat('', this.printlist(sim_list.getValor()[x]).toString());    
                }    
                else if((sim_list.getValor()[x]).getRol() == tipo_rol.type)
                {
                    lista_tmp = lista_tmp.concat((sim_list.getValor()[x]).tostring());
                }
                else
                {
                    lista_tmp = lista_tmp.concat((sim_list.getValor()[x]).tostring());
                }
            }            
        }
        
        lista_tmp = lista_tmp.concat("]");
        
        return lista_tmp;        
    }

    public getThis() 
    {
        return new Funcion_Log(this.fila,this.columna);
    }
    
}

export default Funcion_Log;