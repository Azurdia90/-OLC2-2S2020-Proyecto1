class Tipo
{
    private tipo : tipo_dato;
    private traduccion : String;
    private prioridad : number;
    private identificador : String;

    constructor(p_tipo : tipo_dato, p_identificador? : String)
    {
        this.tipo = p_tipo;
        this.traducir(p_tipo);
        this.identificador = p_identificador;
    }

    private traducir(p_tipo : tipo_dato)
    {
        if(p_tipo == tipo_dato.VOID)
        {
            this.traduccion = "void";
            this.prioridad = -1;
        }
        else if(p_tipo == tipo_dato.NULO)
        {
            this.traduccion = "null";
            this.prioridad = 3;
        }
        else if(p_tipo == tipo_dato.BOOLEANO)
        {
            this.traduccion = "boolean";
            this.prioridad = 0;
        }
        else if(p_tipo == tipo_dato.NUMERO)
        {
            this.traduccion = "number";
            this.prioridad = 1;
        }
        else if(p_tipo == tipo_dato.CADENA)
        {
            this.traduccion = "string";
            this.prioridad = 2;
        }     
        else
        {
            this.traduccion = this.identificador;
            this.prioridad = 3;
        }
    }

    public getTipo()
    {
        return this.tipo
    }

    public getTraduccion()
    {
        return this.traduccion;
    }

    public getPrioridad()
    {
        return this.prioridad;
    }

    public getIdentificador()
    {
        return this.identificador;
    }
}

export default Tipo