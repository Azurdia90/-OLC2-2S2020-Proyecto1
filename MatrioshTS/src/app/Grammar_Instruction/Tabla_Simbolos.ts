import Simbolo from './Simbolo';
import Instruction from './Instruction';
import Stack from './Stack';
import Funcion from './Funcion';

class Tabla_Simbolos
{
    private static instance : Tabla_Simbolos  = new Tabla_Simbolos();
    
    private stack : Stack;
    private entorno_global : Map<String,Simbolo>;
    
    private lista_instrucciones : Array<Instruction>;
    private lista_funciones : Array<Funcion>;    

    constructor() 
    {
        this.stack = new Stack();
        this.entorno_global = new Map<String,Simbolo>();
        this.lista_instrucciones = new Array<Instruction>();
        this.lista_funciones = new Array<Funcion>();
        
        this.stack.push(this.entorno_global);
    }
    
    /**********************METODOS DE SINGLETON********************************/
    
    public static getInstance()
    {
        if(this.instance != null)
        {
            return this.instance;
        }
        else
        {
            this.instance = new Tabla_Simbolos();
            return this.instance;
        }
    }

    /******************FIN METODOS DE SINGLETON********************************/
    /*********************METODOS DE LA CLASE**********************************/
    public clear()
    {
        this.entorno_global.clear();
        this.lista_instrucciones = new Array<Instruction>();  
        this.lista_funciones = new Array<Funcion>();
    }
    
    public existFuncion(p_identificador : String)
    {
        let _return : Boolean = false;
        
        for(var x : number = 0; x < this.lista_funciones.length; x++)
        {
            let funcion_actual : Funcion = this.lista_funciones[x];
            if(funcion_actual.getIdentificador() == p_identificador)
            {
                return true;
            }
        }
        
        return _return;
    }
    
    public getFuncion(p_identificador : String)
    {
        let _return : Funcion;        
        
        for(var x : number = 0; x < this.lista_funciones.length; x++)
        {
            let funcion_actual : Funcion = this.lista_funciones[x];
            if(funcion_actual.getIdentificador() == p_identificador)
            {
                return funcion_actual.getThis();
            }
        }
        
        return _return;
    }        
        
    /*********************FIN DE METODOS DE LA CLASE***************************/

    /***********************METODOS GET Y SET**********************************/
    public getEntorno_global() 
    {
        return this.entorno_global;
    }

    public setEntorno_global(entorno_global : Map<String, Simbolo>) 
    {
        this.entorno_global = entorno_global;
    }

    public getStack() 
    {
        return this.stack;
    }

    public setStack(stack : Stack) 
    {
        this.stack = stack;
    }   
    
    public getLista_instrucciones() 
    {
        return this.lista_instrucciones;
    }

    public setLista_instrucciones(lista_instrucciones : Array<Instruction>) 
    {
        this.lista_instrucciones = lista_instrucciones;
    }

    public getLista_funciones() 
    {
        return this.lista_funciones;
    }

    public setLista_funciones(lista_funciones : Array<Funcion>) 
    {
        this.lista_funciones = lista_funciones;
    }
    
}

export default Tabla_Simbolos;