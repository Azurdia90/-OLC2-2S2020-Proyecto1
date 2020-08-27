import Simbolo from "./Simbolo";
import Tipo from './Tipo';

class Stack extends Array<Map<String,Simbolo>>
{
    //este objeto tiene metodo pop para
    //Eliminar el ultimo de la lista

    //este objeto tiene metodo push para
    //Eliminar el ultimo de la lista
    
    //buscar en todos los ambitos ingresados
    public buscarSimbolo(key : String)
    {
        let _return : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
        _return.setValor("El valor no existe en ningun ámbito");
        
        for(var x : number = (this.length -1); x >= 0; x--)
        { 
            let entorno_local : Map<String,Simbolo> = this[x];
            if(entorno_local.has(key))
            {
                _return = entorno_local.get(key);
                break;
            }            
        }        
        return _return;
    }
}

export default Stack;