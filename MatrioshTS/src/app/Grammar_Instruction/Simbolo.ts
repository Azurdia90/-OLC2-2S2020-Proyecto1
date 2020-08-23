class Simbolo
{
    private fila : number;
    private columna : number;
    
    private acceso : tipo_acceso;
    private rol : tipo_rol;
    private tipo : Tipo;
    private identificador : String;
    private valor : Object;
            
    constructor(p_rol : tipo_rol, p_tipo : Tipo, p_id : String)
    {
        this.acceso = tipo_acceso.publico;
        
        this.rol = p_rol;
        this.tipo = p_tipo;
        this.identificador = p_id; 

        this.valor = undefined;                           
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
    
    public getRol() 
    {
        return this.rol;
    }

    public getTipo() 
    {
        return this.tipo;
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
    
    /*
    public Object getFirstValor() {
        return valor.get(0);
    }

    public void setFirstValor(Object valor) {
        if(this.valor.size() > 0)
        {
            this.valor.set(0, valor);    
        }
        else
        {
            this.valor.add(0, valor); 
        }
    }
    
    public void concatValor(ArrayList<Object> valor) {
        for(int x = 0; x < valor.size(); x++)
        {
            this.valor.add(valor.get(x));
        }        
    }
    */
    
    public toString()
    {
        return this.valor.toString();
    }
}

export default Simbolo