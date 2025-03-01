import Tipo from './Tipo';
import Funcion from './Funcion';
import Instruction from './Instruction';

class Simbolo
{
    private fila : number;
    private columna : number;
    
    private acceso : tipo_acceso;
    private rol : tipo_rol;
    private tipo : Tipo;
    private identificador : String;
    private valor : Object;

    private lista_funciones : Array<Funcion>;
    private lista_dimensiones: Array<Number>;

    private constante : Boolean;
            
    constructor(p_rol : tipo_rol, p_tipo : Tipo, p_id : String)
    {
        this.acceso = tipo_acceso.PUBLICO;
        
        this.rol = p_rol;
        this.tipo = p_tipo;
        this.identificador = p_id; 

        this.valor = undefined;

        this.lista_funciones = new Array<Funcion>();
        this.lista_dimensiones = new Array<Number>();

        this.constante = false;                        
    }
    
    public getFila()
    {
        return this.fila;
    }
    
    public setFila(fila : number)
    {
        this.fila = fila;
    }
    
    public getColumna()
    {
        return this.columna;
    }            
            
    public setColumna(columna : number)
    {
        this.columna = columna;
    }
    
    public getTipo() 
    {
        return this.tipo;
    }

    public setTipo(tipo : Tipo) 
    {
        this.tipo = tipo;
    }

    public getRol() 
    {
        return this.rol;
    }

    public getIdentificador() 
    {
        return this.identificador;
    }

    public getValor() {
        return this.valor;
    }

    public setValor(valor : Object) {
        this.valor = valor;
    }

    public getConstante()
    {
        return this.constante;
    }

    public setConstante(p_constante : Boolean)
    {
        this.constante = p_constante;
    }

    public getListaDimensiones()
    {
        return this.lista_dimensiones;
    }

    public setListaDimensiones(p_lista_dimensiones: Array<Number>)
    {
        this.lista_dimensiones = p_lista_dimensiones;
    }

    public getListaFunciones()
    {
        return this.lista_funciones;
    }

    public setListaFunciones(p_lista_funciones: Array<Funcion>)
    {
        this.lista_funciones = p_lista_funciones;
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
    
    public tostring()
    {
        return this.valor.toString();
    }
}

export default Simbolo